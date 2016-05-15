import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Auth} from 'ng2-ui-auth';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {GithubService, Repository} from "./github.service";
import {Observable} from "rxjs/Observable";

declare var jQuery:any;

@Injectable()
export class AwesomeService extends GithubService {
    constructor(private _http:Http, private _auth:Auth) {
        super(_http, _auth);
    }

    search(query:string):Promise<Object> {

        let rep :Repository = this.getRepository("sindresorhus", "awesome");
        return new Promise((resolve, reject) => {
            rep.getReadmeContent((res) => {
                this.fromMarkdown(res, (r) => {
                    var parser = new DOMParser();
                    var doc = parser.parseFromString(r, 'text/html');

                    var headings = [].slice.call(doc.body.querySelectorAll('h2')),
                        $head, children, source, results = [], i = 10;

                    headings.forEach(element => {
                        $head = jQuery(element);
                        children = [].slice.call($head.next().find('a'));

                        var $child;
                        children.forEach(child => {
                            $child = jQuery(child);

                            results.push({
                                category: $head.text(),
                                name: $child.text(),
                                href: $child.attr('href')
                            });
                        });
                    });

                    results = results.filter(item => (item.category.toLowerCase().indexOf(query) >= 0 || item.name.toLowerCase().indexOf(query) >= 0) && (i--) > 0);

                    resolve(results);
                });
            });

        });
    }
}