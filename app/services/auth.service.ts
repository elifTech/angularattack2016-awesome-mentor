import {Injectable} from '@angular/core';
import {Observer} from 'rxjs/Observer';
import {Observable} from 'rxjs/Observable';
import {ComponentInstruction} from '@angular/router-deprecated';
import {Auth} from 'ng2-ui-auth';
import {GithubService} from "./github.service";
import {GoogleService} from "./google.service";
import {UserModel} from "../models/user.model";

@Injectable()
export class AuthService {
    public static provider: string;

    public static auth: Auth;

    public static user$: Observable<UserModel>;
    
    private _userObserver: Observer<UserModel>;

    private _user: UserModel;

    constructor (private github: GithubService, private google: GoogleService, private auth:Auth) {
        AuthService.auth = auth;
        if (!AuthService.user$) {
            AuthService.user$ = new Observable<UserModel>(observer => {
                this._userObserver = observer
            }).share();
        }
    }

    public init() {
        AuthService.provider = localStorage.getItem('provider') || null;
        if (this.auth.isAuthenticated()) {
            this.loadUserInfo();
        }
    }

    public static setProvider(provider) {
        AuthService.provider = provider;
        localStorage.setItem('provider', provider);
    }

    public loadUserInfo() {
        if (AuthService.provider == 'github') {
            return this.github.getUser(user => {
                user.type = 'github';
                this.github.getCollaborators()
                    .then(res => {
                        user.is_owner = true;
                        this._user = user;
                        this._userObserver.next(this._user);
                    }).catch(res => {
                        user.is_owner = false;
                        this._user = user;
                        this._userObserver.next(this._user);
                    });
            });
        }
        this.google.getUser(user => {
            user.type = 'google';
            user.is_owner = false;
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
                if ((<any>next.routeData.data).permissions[0] == AuthService.provider) {
                    console.log((<any>next.routeData.data).permissions[0],
                        next.routeName, 'can activate -> ',  AuthService.auth && AuthService.auth.isAuthenticated(),
                        'permission', AuthService.provider
                    );
                    return resolve(AuthService.auth && AuthService.auth.isAuthenticated());
                }
                resolve(false);
            } else {
                resolve(true);
            }
        });
    }
}