import { Injectable } from '@angular/core';
import { Profession } from '../models/profession.model';
import { HTTP_PROVIDERS, Http, Response }    from '@angular/http';
import {Observable, Observer} from 'rxjs/Rx';
import {GithubService, Repository} from "./github.service";
import 'rxjs/add/operator/share';

@Injectable()
export class ProfessionService extends GithubService{
    public config: any;
    public repos: Repository;
    private _dataObserver: Observer<Profession[]>;
    files$: Observable<Profession[]>;
    private _dataStore: {
        files: Profession[]
    }

    constructor(public http: Http) {
        super(http);
        this.config = {
            github: {
                list: 'https://api.github.com/repos/polluxx/awesomementor/contents/professions',
                readme: 'https://raw.githubusercontent.com/polluxx/awesomementor/master'
            }
        };
        this.repos = this.getRepository('polluxx', 'awesomementor');
    }

    list(): Promise<Profession[]> {
        return new Promise((resolve, reject) => {
            this.repos.readFolders((res) => {
                resolve(res.map(file => {
                    return new Profession(file.name, file.path, 'polluxx/awesomementor');
                }));
            }, 'professions');
        });
    }
}