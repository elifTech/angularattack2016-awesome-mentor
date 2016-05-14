import {Injectable} from '@angular/core';
import {Observer} from 'rxjs/Observer';
import {Observable} from 'rxjs/Observable';
import {ComponentInstruction} from '@angular/router-deprecated';
import {Auth} from 'ng2-ui-auth';
import {GithubService} from "./github.service";

export interface UserModel {
    avatar_url: string,
    name: string
}

@Injectable()
export class AuthService {
    public static auth: Auth;

    public static user$: Observable<UserModel>;
    
    private _userObserver: Observer<UserModel>;

    private _user: UserModel;

    constructor (private github: GithubService, private auth:Auth) {
        AuthService.auth = auth;
        if (!AuthService.user$) {
            AuthService.user$ = new Observable<UserModel>(observer => {
                this._userObserver = observer
            }).share();
        }
    }

    public init() {
        if (this.auth.isAuthenticated()) {
            this.loadUserInfo();
        }
    }

    public loadUserInfo() {
        this.github.getUser(user => {
            this._user = user;
            this._userObserver.next(this._user);
        });
    }

    public logout() {
        let sub = this.auth.logout();
        sub.subscribe(() => {
            this._user = null;
            this._userObserver.next(this._user);
        });
        return sub;
    }
    
    public static canComponentActivate(next:ComponentInstruction, prev:ComponentInstruction) {
        return new Promise((resolve, reject) => {
            //console.log('canComponentActivate', AuthService.$auth);
            if ((<any>next.routeData.data).permissions) {
                if ((<any>next.routeData.data).permissions[0] == "github") {
                    console.log(next.routeName, 'can activate -> ',  AuthService.auth && AuthService.auth.isAuthenticated());
                    resolve(AuthService.auth && AuthService.auth.isAuthenticated());
                }
            } else {
                resolve(true);
            }
        });
    }
}