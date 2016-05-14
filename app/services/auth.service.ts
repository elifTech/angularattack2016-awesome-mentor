import {Injectable} from '@angular/core';
import {ComponentInstruction} from '@angular/router-deprecated';
import {Auth} from 'ng2-ui-auth';

@Injectable()
export class AuthService {
    public static $auth:Auth;

    public static canComponentActivate(next:ComponentInstruction, prev:ComponentInstruction) {
        return new Promise((resolve, reject) => {
            //console.log('canComponentActivate', AuthService.$auth);
            if ((<any>next.routeData.data).permissions) {
                if ((<any>next.routeData.data).permissions[0] == "github") {
                    console.log(next.routeName, 'can activate -> ',  AuthService.$auth && AuthService.$auth.isAuthenticated());
                    resolve(AuthService.$auth && AuthService.$auth.isAuthenticated());
                }
            } else {
                resolve(true);
            }
        });
    }
}