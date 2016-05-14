import {Injectable} from '@angular/core';
import {Profession} from '../models/profession.model';
import {HTTP_PROVIDERS, Http, Response}    from '@angular/http';
import {Observable, Observer} from 'rxjs/Rx';
import {GithubService, Repository} from "./github.service";
import 'rxjs/add/operator/share';

@Injectable()
export class ProfessionService extends GithubService {
    public config:any;
    public repos:Repository;
    private _dataObserver:Observer<Profession[]>;
    files$:Observable<Profession[]>;
    private _dataStore:{
        files:Profession[]
    }

    constructor(public http:Http) {
        super(http);
        this.config = {
            github: {
                list: 'https://api.github.com/repos/polluxx/awesomementor/contents/professions',
                readme: 'https://raw.githubusercontent.com/polluxx/awesomementor/master'
            }
        };
        this.repos = this.getRepository('polluxx', 'awesomementor');
    }

    list():Promise<Profession[]> {
        return new Promise((resolve, reject) => {
            this.repos.readFolders((res) => {
                resolve(res.map(file => {
                    return new Profession(file, 'polluxx/awesomementor');
                }));
            }, 'professions');
        });
    }

    getByName(name:string):Promise<Profession> {
        var p1 = new Promise((resolve, reject) => {
            this.repos.readFiles((files) => {
                console.log('files', files);
                resolve(files);
            }, 'professions/' + name);
        });

        var p2 = new Promise((resolve, reject) => {
            this.repos.getReadmeContent((file) => {
                //console.log('file',file);
                resolve(file);
            }, 'professions/' + name);
        });

        return new Promise((resolve, reject) => {
            Promise.all([p1, p2]).then((res) => {
                //console.log('res', res);
                var profession = new Profession(res[1], 'polluxx/awesomementor')

                profession.levels = [].slice.call(res[0]).map(file => {
                    return {
                        title: file.name.replace('.md', '')
                    };
                }).filter(file => {
                    return file.title.indexOf('README') == -1;
                });

                resolve(profession);
            });
        });
    }

    getLevelItems(profName:string, level:string):Promise<Object[]> {
        return new Promise((resolve, reject) => {
            this.repos.getFileContent((content) => {
                //console.log('content', content);
                var parts = content.split("\n");
                parts.splice(0, 2);

                var links = parts.map(item => {
                    return {
                        source: item,
                        domain: item.match(/([\da-z\.-]+)\.([a-z\.]{2,6})/)[0]
                    };
                });
                
                resolve(links);
            }, 'professions/' + profName, level + '.md');
        });
    }
}