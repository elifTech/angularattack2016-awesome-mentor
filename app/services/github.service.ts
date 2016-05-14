import {Injectable} from '@angular/core';
import {HTTP_PROVIDERS, Http} from '@angular/http';

export class RepositoryItem {
    constructor(private http:Http, private repos: Repository, private data) {
        console.info(data)
    }

    setContent() {

    }
}

export class Repository {
    private url: string;

    constructor(private http:Http, private owner: string, private repos: string) {
        this.url = 'https://api.github.com/repos/' + owner + '/' + repos;
    }

    get url() {
        return this.url;
    }

    readDir(next, path = '') {
        this.http.get(this.url + '/contents/' + path).subscribe(res => {
            next(res.json().map((item) => new RepositoryItem(this.http, this, item)));
        });
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
