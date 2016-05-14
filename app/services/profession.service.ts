import {Injectable} from '@angular/core';
import {Profession} from '../models/profession.model';
import {HTTP_PROVIDERS, Http, Response}    from '@angular/http';
import {Observable, Observer} from 'rxjs/Rx';
import {GithubService, Repository, RepositoryItem} from "./github.service";
import {ConfigService} from "./config.service";
import {Level} from "../models/level.model";
import 'rxjs/add/operator/share';

declare var jQuery:any;

const GITHUB_README_REGEX = /readme\.md/i;

@Injectable()
export class ProfessionService {
    public repos:Repository;
    private _dataObserver:Observer<Profession[]>;
    files$:Observable<Profession[]>;
    private _dataStore:{
        files:Profession[]
    }

    constructor(private github: GithubService) {
        this.repos = github.getCurrentRepository();
    }

    list():Promise<Profession[]> {
        return new Promise((resolve, reject) => {
            this.repos.readFolders((res) => {
                resolve(res.map(file => {
                    return new Profession(file, ConfigService.repOwner + '/' + ConfigService.repName);
                }));
            }, 'professions');
        });
    }

    public save(item:Profession) {
        this.repos = this.github.getCurrentRepository();
        this.repos.readFiles((res) => {
            let file = res.find(item => item.name == 'README.md');
            if(!file) {
                file = this.repos.newFile('professions/' + item.name + '/README.md');
            }
            file.setContent(item.toMd(), (new Date()).toString(), res => {
                console.info(res);
            });
        }, 'professions/' + item.name);

        item.levels.forEach((level) => {
            this.saveLevel(item, level);
        });
    }

    public saveLevel(item:Profession, level:Level) {
        this.repos = this.github.getCurrentRepository();

        this.repos.readFiles(res => {
            let file = res.find(item => item.name == level.name + '.md');
            if (!file) {
                file = this.repos.newFile('professions/' + item.name + '/' + level.name + '.md');
            }
            file.setContent(level.toMd(), (new Date()).toString(), res => {
                console.info(res);
            });
        }, 'professions/' + item.name);
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
                var profession = new Profession(res[1], ConfigService.repOwner + '/' + ConfigService.repName)

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

                this.github.fromMarkdown(content, function (links) {
                    var parser = new DOMParser();
                    var doc = parser.parseFromString(links, 'text/html');
                    var headings = [].slice.call(doc.body.querySelectorAll('h2')),
                        head, link, source, img, desc, results = [];

                    headings.forEach(element => {
                        head = jQuery(element);
                        source = head.next();
                        img = source.next();
                        desc = img.next();
                        link = source.find('a').attr('href');

                        let parsed = {
                            title: head.text(),
                            source: link,
                            img: img.find('a').attr('href'),
                            description: desc.find('strong').text(),
                            domain: link.match(/([\da-z\.-]+)\.([a-z\.]{2,6})/)[0].replace(/w{3}\./, '')
                        };

                        results.push(parsed);
                    });

                    resolve(results);
                });
            }, 'professions/' + profName, level + '.md');
        });
    }
}