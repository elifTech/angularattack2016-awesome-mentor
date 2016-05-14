import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Auth} from 'ng2-ui-auth';

@Injectable()
export class GoogleService {
    private _token:string;

    constructor(public http:Http, private auth:Auth) {
    }

    static get url() {
        return 'https://www.googleapis.com';
    }

    getHttpOptions(body?: string) {
        let opts = {
            headers: new Headers({
            })
        };
        if (this._token) {
            opts.headers.set('Authorization', 'Bearer ' + this._token);
        }
        if (body) {
            opts['body'] = body;
        }
        return opts;
    }

    getUser(next) {
        if (this.auth.isAuthenticated()) {
            this._token = this.auth.getToken();
        }
        let opts = this.getHttpOptions();
        this.http.get(GoogleService.url + '/plus/v1/people/me', opts).subscribe(res => {
            let user = res.json();
            user.name = user.displayName;
            if (user.image && user.image.url) {
                user.avatar_url = user.image.url;
            } else  if (user.cover && user.cover.coverPhoto) {
                user.avatar_url = user.cover.coverPhoto.url;
            }
            next(user);
        });
    }
}
