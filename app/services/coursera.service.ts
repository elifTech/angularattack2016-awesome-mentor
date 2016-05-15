import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class CourseraService {
    private _apiUrl:string = 'https://p2.davintoo.com';

    constructor(private http:Http) {
        //console.log('constructor', http);
    }

    public search(query:string) {
        //console.log('CourseraService search', query, this.http);

        return this.http
            .get(this._apiUrl + '?q=search&limit=10&query=' + query)
            .map(response => response.json())
            .map(res => res.elements)
            .toPromise();
    }
}
