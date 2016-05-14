import { Injectable } from '@angular/core';
import { Profession } from '../models/profession.model';
import { HTTP_PROVIDERS, Http, Response }    from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class ProfessionService {
    public config: any;

    constructor(private http: Http) {
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

        return new Document();
    }

    private handleError(error: any) {
        let errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}