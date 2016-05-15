import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Base64Service} from './base64.service';
import {ConfigService} from './config.service';
import {AuthService} from './auth.service';
import 'rxjs/add/operator/map';
import {Auth} from 'ng2-ui-auth';

export const GITHUB_README_REGEX = /readme\.md/i;

export class RepositoryItem {
    constructor(private http:Http, private repos:Repository, private data, private service:GithubService) {
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

    get htmlUrl() {
        return this.data.html_url;
    }

    get isFile() {
        return this.data.type == 'file';
    }

    private get sha() {
        return this.data.sha;
    }

    get treeNode() {
        return {
            path: this.data.path,
            mode: "100644",
            type: this.data.type,
            sha: this.sha
        }
    }

    getContent(next) {
        let apiUrl = this.url + this.data.path;
        let opts = this.service.getHttpOptions();
        this.http.get(apiUrl, opts)
            .map(res => res.text())
            .subscribe(next);
    }

    setContent(content, message, next) {
        let apiUrl = this.url + this.data.path,
            params = {
                message: message,
                content: Base64Service.encode(content),
                sha: this.sha
            };

        let opts = this.service.getHttpOptions();
        this.http.put(apiUrl, JSON.stringify(params), opts).subscribe(res => {
            next(res.json());
        });
    }

    deleteFile(message, next) {
        let apiUrl = this.url + this.data.path,
            params = {
                message: message,
                sha: this.sha
            };

        let opts = this.service.getHttpOptions(JSON.stringify(params));
        this.http.delete(apiUrl, opts).subscribe(res => {
            next(res.json());
        });
    }
}

export class Repository {
    private _url:string;

    constructor(private http:Http, private owner:string, private repos:string, private service:GithubService) {
        this._url = GithubService.url + '/repos/' + owner + '/' + repos;
    }

    get url() {
        return this._url;
    }

    newFile(path: string) {
        return new RepositoryItem(this.http, this, {
            path: path,
            mode: "100644",
            type: 'file'
        }, this.service);
    }

    readDir(next, path = '') {
        let opts = this.service.getHttpOptions();
        this.http.get(this.url + '/contents/' + path, opts).subscribe(res => {
            next(res.json().map((item) => new RepositoryItem(this.http, this, item, this.service)));
        }, err => {
            next([]);
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
        console.log(path, name);
        this.readFiles(res => {
            let file = res.find(item => item.name == name);
            file ? file.getContent(next) : next(null);
        }, path);
    }

    getTree(next) {
        let opts = this.service.getHttpOptions();
        this.http.get(this.url + '/git/trees/master?recursive=1', opts).subscribe(res => {
            next(res.json().tree.map((item) => new RepositoryItem(this.http, this, item, this.service)));
        });
    }

    getCollaborators() {
        let opts = this.service.getHttpOptions();
        return this.http.get(this.url + '/collaborators', opts).toPromise();
    }
   /* createTree(sha:string, items:RepositoryItem[]) {
        let opts = this.service.getHttpOptions(),
            params = {
                base_tree: sha,
                tree: []
            };

        params.tree = items.map(item => item.treeNode);

        this.http.post(this.url + '/git/trees', opts).subscribe(res => {
            //next(res.json().map((item) => new RepositoryItem(this.http, this, item, this.service)));
        });
    }*/
}

@Injectable()
export class GithubService {
    private _token:string;

    constructor(public http:Http, private auth:Auth) {
    }

    static get url() {
        return 'https://api.github.com';
    }

    getCurrentRepository() {
        return this.getRepository(ConfigService.repOwner, ConfigService.repName);
    }

    getRepository(owner:string, repos:string) {
        if (this.auth.isAuthenticated()) {
            this._token = this.auth.getToken();
        }
        return new Repository(this.http, owner, repos, this);
    }

    getHttpOptions(body?: string) {
        let opts = {
            headers: new Headers({
                'Accept': 'application/vnd.github.v3.raw'
            })
        };

        var provider = localStorage.getItem('provider');
        if (this._token && provider == 'github') {
            opts.headers.set('Authorization', 'Bearer ' + this._token);
        }
        if (body) {
            opts['body'] = body;
        }
        return opts;
    }

    fromMarkdown(text:string, next) {
        if (!text) {
            return next('');
        }
        let params = {
            "text": text,
            "mode": "markdown"
        };
        let opts = this.getHttpOptions();
        this.http.post(GithubService.url + '/markdown', JSON.stringify(params), opts).subscribe(res => {
            next(res.text());
        });
    }

    getUser(next) {
        if (this.auth.isAuthenticated()) {
            this._token = this.auth.getToken();
        }
        let opts = this.getHttpOptions();
        this.http.get(GithubService.url + '/user', opts).subscribe(res => {
            next(res.json());
        });
    }

    makeGist(params:any, next) {
        if (this.auth.isAuthenticated()) {
            this._token = this.auth.getToken();
        }
        let opts = this.getHttpOptions();
        this.http.post(GithubService.url + '/gists', JSON.stringify(params), opts).subscribe(res => {
            next(res.json());
        });
    }
}
