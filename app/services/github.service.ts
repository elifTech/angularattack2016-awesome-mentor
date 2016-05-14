import {Injectable} from '@angular/core';
import {HTTP_PROVIDERS, Http} from '@angular/http';

export class RepositoryItem {
    constructor(private http:Http, private repos: Repository, private data) {
        console.info(data)
    }

    get url() {
        return this.repos.url + '/contents/';
    }

    get isDir() {
        return this.data.type == 'dir';
    }

    setContent() {
        let apiUrl = this.url + this.data.path;
        console.info(apiUrl)
    }
}

export class Repository {
    private _url: string;

    constructor(private http:Http, private owner: string, private repos: string) {
        this._url = 'https://api.github.com/repos/' + owner + '/' + repos;
    }

    get url() {
        return this._url;
    }

    readDir(next, path = '') {
        this.http.get(this.url + '/contents/' + path).subscribe(res => {
            next(res.json().map((item) => new RepositoryItem(this.http, this, item)));
        });
    }

    readFolders(next, path = '') {
        this.readDir(res => {
            next(res.filter(item => item.isDir));
        }, path);
    }
}

@Injectable()
export class GithubService {
    constructor(private http:Http) {
    }
    
    getRepository(owner: string, repos: string) {
        return new Repository(this.http, owner, repos);
    }
}
