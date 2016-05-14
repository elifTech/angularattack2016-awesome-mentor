import {Injectable} from '@angular/core';
import {HTTP_PROVIDERS, Http, Headers} from '@angular/http';
import {Base64Service} from './base64.service';
import 'rxjs/add/operator/map';

const GITHUB_README_REGEX = /readme\.md/i;

export class RepositoryItem {
    constructor(private http:Http, private repos: Repository, private data) {
    }

    get url() {
        return this.repos.url + '/contents/';
    }

    get isDir() {
        return this.data.type == 'dir';
    }

    get name() {
        return this.data.name;
    }

    get isFile() {
        return this.data.type == 'file';
    }

    private get sha() {
        return this.data.sha;
    }

    getContent(next) {
        let apiUrl = this.url + this.data.path;
        this.http.get(apiUrl)
            .map(res => Base64Service.decode(res.json().content))
            .subscribe(next);
    }

    setContent(content, message, next) {
        let apiUrl = this.url + 'test.md',
            params = {
                message: message,
                content: Base64Service.encode(content),
                committer: {
                    name: 'esvit',
                    email: 'esvit666@gmail.com'
                },
                sha: this.sha
            };
        let opts = {
            headers: new Headers({
                'Accept': 'application/vnd.github.v3.raw'
            })
        };

        console.info(apiUrl,this.data);

        this.http.post(apiUrl, JSON.stringify(params), opts).subscribe(res => {
            next(res);
        });
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

    readFiles(next, path = '') {
        this.readDir(res => {
            next(res.filter(item => item.isFile));
        }, path);
    }

    getReadmeContent(next, path = '') {
        this.readFiles(res => {
            let file = res.find(item => item.name.match(GITHUB_README_REGEX));
            file ? file.getContent(next) : next(null);
        }, path);
    }

    getFileContent(next, path = '', name = '') {
        this.readFiles(res => {
            let file = res.find(item => item.name == name);
            file ? file.getContent(next) : next(null);
        }, path);
    }
}

@Injectable()
export class GithubService {
    constructor(public http:Http) {
    }
    
    getRepository(owner: string, repos: string) {
        return new Repository(this.http, owner, repos);
    }
}
