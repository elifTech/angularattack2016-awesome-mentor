import {Injectable} from '@angular/core';
import {Profession} from '../models/profession.model';
import {HTTP_PROVIDERS, Http, Response}    from '@angular/http';
import {Observable, Observer} from 'rxjs/Rx';
import {GithubService, Repository, RepositoryItem} from "./github.service";
import {ConfigService} from "./config.service";
import {Level} from "../models/level.model";
import {LevelItem} from "../models/level-item.model";
import 'rxjs/add/operator/share';

declare var jQuery:any;

const GITHUB_README_REGEX = /readme\.md/i;

const MARKDOWN_PARSE_REGEXP = /##[\s]+(.*)[\r\n]+\[[^\]]+\]\(([^\)]+)\)[\r\n]+\!\[[^\]]+\]\(([^\)]+)\)[\r\n]+\-[\s]*(.*)[\r\n]+[\s]*(.*)/gi;

@Injectable()
export class ProfessionService {
    public repos:Repository;

    constructor(private github:GithubService) {
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

        return new Promise((resolve, reject) => {
            if (item.isNew) {
                let file = this.repos.newFile('professions/' + item.name + '/README.md');
                file.setContent(item.toMd(), (new Date()).toString(), res => {
                    // console.info(res);
                    resolve(res);
                });
            } else {
                this.repos.readFiles((res) => {
                    let file = res.find(item => item.name == 'README.md');
                    if (!file) {
                        file = this.repos.newFile('professions/' + item.name + '/README.md');
                    }
                    file.setContent(item.toMd(), (new Date()).toString(), res => {
                        // console.info(res);
                        resolve(res);
                    });
                }, 'professions/' + item.name);
            }
        });
    }

    public saveLevel(professionName:string, level:Level) {
        this.repos = this.github.getCurrentRepository();
        if(level.isNew) {
            return new Promise((resolve, reject) => {
                let file = this.repos.newFile('professions/' + professionName + '/' + level.name + '.md');
                console.log('level.toMd()', level.toMd());
                file.setContent(level.toMd(), (new Date()).toString(), res => {
                    // console.info(res);
                    resolve(res);
                });
            });
        } else {
            return new Promise((resolve, reject) => {
                this.repos.readFiles(res => {
                    let file = res.find(item => item.name == level.name + '.md');
                    if (!file) {
                        file = this.repos.newFile('professions/' + professionName + '/' + level.name + '.md');
                    }
                    console.log('level.toMd()', level.toMd());
                    file.setContent(level.toMd(), (new Date()).toString(), res => {
                        // console.info(res);
                        resolve(res);
                    });
                }, 'professions/' + professionName);
            });
        }
    }

    public removeLevel(professionName:string, levelName:string) {
        this.repos = this.github.getCurrentRepository();
        return new Promise((resolve, reject) => {
            this.repos.readFiles(res => {
                let file = res.find(item => item.name == levelName + '.md');
                if (file) {
                    file.deleteFile((new Date()).toString(), res => {
                        // console.info(res);
                        resolve(res);
                    });
                }
            }, 'professions/' + professionName);
        });
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

                profession.levels = [].slice.call(res[0]).filter(file => {
                    //console.log('file.data', file.data);
                    return file.data.name.indexOf('README.md') == -1;
                }).map(file => {
                    return new Level({name: file.data.name.replace('.md', '')});
                });

                resolve(profession);
            });
        });
    }

    getLevelItems(profName:string, level:string):Promise<Object[]> {
        return new Promise((resolve, reject) => {
            this.repos.getFileContent((content) => {
                let match: any,
                    results:LevelItem[] = [];

                while(match = MARKDOWN_PARSE_REGEXP.exec(content)) {
                    let item = new LevelItem({
                        name: match[1],
                        source: match[2],
                        img: match[3],
                        description: match[5],
                        tags: (match[4] || '').split(','),
                    });
                    results.push(item);
                }
                resolve(results);
            }, 'professions/' + profName, level + '.md');
        });
    }
}