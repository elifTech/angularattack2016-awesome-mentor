import { Injectable } from '@angular/core';
import { Profession } from '../models/profession.model';
import { HTTP_PROVIDERS, Http, Response }    from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {GithubService} from "./github.service";

@Injectable()
export class ProfessionService extends GithubService{
    public config: any;

    constructor(private http: Http) {
        super(http);
        this.config = {
            github: {
                list: 'https://api.github.com/repos/polluxx/awesomementor/contents/professions',
                readme: 'https://raw.githubusercontent.com/polluxx/awesomementor/master'
            }
        };
    }

    request(url: string) {

    }

    list(): Observable<Profession[]> {
        let doc = new Profession('default');
        let doc2 = new Profession('second');
        let docs = [doc, doc2];

        return this.http.get(this.config.github.list)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Response status: ' + res.status);
        }
        let body = res.json();

        console.log(body.data);

        return body.data || {};
    }

    private handleError (error: any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}