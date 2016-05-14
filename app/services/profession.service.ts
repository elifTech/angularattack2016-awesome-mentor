import {Injectable} from '@angular/core';
import {Profession} from '../models/profession.model';
import {HTTP_PROVIDERS, Http, Response}    from '@angular/http';
import {Observable, Observer} from 'rxjs/Rx';
import {GithubService, Repository} from "./github.service";
import 'rxjs/add/operator/share';

declare var jQuery:any;

const GITHUB_README_REGEX = /readme\.md/i;

@Injectable()
export class ProfessionService {
    public config:any;
    public repos:Repository;
    private _dataObserver:Observer<Profession[]>;
    files$:Observable<Profession[]>;
    private _dataStore:{
        files:Profession[]
    }

    constructor(private github: GithubService) {
        this.config = {
            github: {
                list: 'https://api.github.com/repos/polluxx/awesomementor/contents/professions',
                readme: 'https://raw.githubusercontent.com/polluxx/awesomementor/master'
            }
        };
        this.repos = github.getRepository('polluxx', 'awesomementor');
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

    public save(item:Profession) {
        this.repos = this.github.getRepository('esvit', 'test-repos');
        this.repos.readFiles((res) => {
            let file = res.find(item => item.name.match(GITHUB_README_REGEX));
            file.setContent(item.toMd(), (new Date()).toString(), res => {
                console.info(res);
            });
        });


        // this.repos.readFiles((files) => {
        //     //console.log('files', files);
        //     resolve(files);
        // }, 'professions/' + name);
    }

    getByName(name:string):Promise<Profession> {
        var p1 = new Promise((resolve, reject) => {
            this.repos.readFiles((files) => {
                //console.log('files', files);
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

                this.github.fromMarkdown(content, function(links) {
                    var parser = new DOMParser();
                    var doc = parser.parseFromString(links, 'text/html');
                    var headings = [].slice.call(doc.body.querySelectorAll('h2')),
                        head, childs, source, results = [];

                    headings.forEach(element => {
                        head = jQuery(element);
                        childs = head.next().children();
                        source = jQuery(childs[0]).attr('href');
                        let parsed = {
                            title: head.text(),
                            source: source,
                            img: jQuery(childs[1]).attr('href'),
                            desc: jQuery(childs[2]).text(),
                            domain: source.match(/([\da-z\.-]+)\.([a-z\.]{2,6})/)[0].replace(/w{3}\./, '')
                        };
                        
                        results.push(parsed);
                    });

                    resolve(results);
                });
            }, 'professions/' + profName, level + '.md');
        });
    }
}