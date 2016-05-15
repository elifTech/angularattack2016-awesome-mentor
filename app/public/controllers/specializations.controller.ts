import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {GithubService} from '../../services/github.service'
import {toArray} from 'lodash';

@Component({
    templateUrl: '/views/about.html',
    directives: [CORE_DIRECTIVES],
    providers: [
        GithubService
    ]
})
export class PublicSpecializationsController {
    public items: any[];
    
    constructor(private github: GithubService){

        github.getCurrentRepository().getTree(res => {
            // console.info(res);

            var nodes = {};

            res = res.map(item => {
                item.data.pathParts = item.data.path.replace(/\.md/g, '').split('/');

                return item;
            });

            let plain = {};

            res.map(item => {
                let lvl = item.data.pathParts.length;

                item.parent = lvl-2 >= 0 ? item.data.pathParts[lvl-2] : '';
                item.id = item.data.pathParts[lvl-1];

                plain[item.data.pathParts[lvl-1]] = item;
            });

            var plainToTree = (dic, node) => {
                let children = [];

                if(dic){
                    var k;
                    for(k in dic){
                        let v = plain[k];

                        if(v['parent'] === node['id']){
                            let child = plainToTree(dic, v);

                            if(child)
                                children.push(child);
                        }
                    }
                }

                if(children)
                    node['children'] = children;

                return node;
            };

            var k;
            for(k in plain){
                let node = plain[k];

                if(!node['parent'])
                    nodes[node['id']] = plainToTree(plain, node);
            }

            this.items = toArray(nodes);
        });
        
    }
}