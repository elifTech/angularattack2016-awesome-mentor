import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Auth} from 'ng2-ui-auth';

import {Base64Service} from '../services/base64.service';

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
    
    driveAuth(): Promise<any> {
        if (this.auth.isAuthenticated()) {
            this._token = this.auth.getToken();
        }

        if(!this._token) {
            gapi.auth.init(function ():any {

            });
            gapi.auth.signIn(this._token);
        }
        /* jshint camelCase: false */
        var token: any = gapi.auth.getToken();

        var now = Date.now() / 1000;
        if (token /*&& ((token.expires_at - now) > (60))*/) {

            return new Promise((resolve, reject) => {resolve(token)});
        } else {
            var params = {
                'client_id': '616075536950-pauau0e7u0c980llqh99ftvg3sd32c61.apps.googleusercontent.com',
                'scope': [
                    'https://www.googleapis.com/auth/drive.file',
                    'https://www.googleapis.com/auth/drive.install'
                ],
                'immediate': false,
                //'user_id': userId
            };

            return new Promise((resolve, reject) => {
                gapi.auth.authorize(params, function (result) {
                    if (result && !result.error) {
                        resolve(result);
                    } else {
                        reject(result);
                    }
                });
            });
        }
    }

    public createDocument = function (document: any) {
        var multipartRequestBody = this.buildMetaData(document);
        const boundary = '-------314159265358979323846';

        return new Promise((resolve, reject) => {
            var onComplete = function (result) {
                if (result && !result.error) {
                    resolve(result);
                } else {
                    reject(result);
                }
            };
            gapi.client.request({
                'path': '/upload/drive/v2/files',
                'method': 'POST',
                'params': {'uploadType': 'multipart', 'alt': 'json'},
                'headers': {
                    'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
                },
                'body': multipartRequestBody
            }).execute(onComplete);
        });
    }

    public updateDocument = function(document) {
        var multipartRequestBody = this.buildMetaData(document);
        const boundary = '-------314159265358979323846';

        return new Promise((resolve, reject) => {
            var onComplete = function (result) {
                if (result && !result.error) {
                    resolve(result);
                } else {
                    reject(result);
                }
            };
            gapi.client.request({
                'path': '/upload/drive/v2/files/'+document.id,
                'method': 'PUT',
                'params': {'uploadType': 'multipart', 'alt': 'json'},
                'headers': {
                    'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
                },
                'body': multipartRequestBody
            }).execute(onComplete);
        });
    }

    
    public getDocument = function(id) {
        return new Promise((resolve, reject) => {
            var onComplete = function (result) {
                if (result && !result.error) {
                    resolve(result);
                } else {
                    reject(result);
                }
            };
            gapi.client.request({
                'path': '/drive/v2/files/'+id,
                'method': 'GET'
            }).execute(onComplete);
        });
    }

    

    public findDocument = function(name: string, prefix?: string) {
        if(!prefix) prefix = "AwesomeMentor: ";
        var self = this;
        return new Promise((resolve, reject) => {
            var onComplete = function (result) {
                if (result && !result.error) {
                    if(result.items && result.items[0]) {
                        self.getDocumentContent(result.items[0].webContentLink)
                            .then(resolve)
                            .catch(reject);
                        return;
                    }
                    console.log('-----');
                    resolve(result.items[0]);
                } else {
                    reject(result);
                }
            };
            gapi.client.request({
                'path': '/drive/v2/files/',
                'method': 'GET',
                'params': {
                    'q': "title = '" + prefix+name + "'"
                }
            }).execute(onComplete);
        });
    }

    public getDocumentContent(fileUrl: string) {
        return new Promise((resolve, reject) => {
            let opts = this.getHttpOptions();
            this.http.get(fileUrl, opts).subscribe(res => {
                let result = res.json();
                resolve(result);
            });
        });
    }

    public buildMetaData(document: any, prefix?:string) {
        var jsonData = document.courses.map(course => {return course.toJson();}).join(',');
        if(!prefix) prefix = "AwesomeMentor: ";
        const boundary = '-------314159265358979323846';
        const delimiter = "\r\n--" + boundary + "\r\n";
        const close_delim = "\r\n--" + boundary + "--";

        var fileMetadata = {
            title: prefix + document.name,
            name: prefix + document.name,
            mimeType: 'application/json'
        };

        var contentType = 'application/json';
        // Updating the metadata is optional and you can instead use the value from drive.files.get.
        var base64Data = Base64Service.encode(jsonData);
        var multipartRequestBody =
            delimiter +
            'Content-Type: application/json\r\n\r\n' +
            JSON.stringify(fileMetadata) +
            delimiter +
            'Content-Type: ' + contentType + '\r\n' +
            'Content-Transfer-Encoding: base64\r\n' +
            '\r\n' +
            base64Data +
            close_delim;
        return multipartRequestBody;
    }
}
