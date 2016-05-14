import {Injectable} from '@angular/core';
import {HTTP_PROVIDERS, Http} from '@angular/http';

@Injectable()
export class GithubService {
    constructor(http:Http) {
        console.log(http);
    }
}
