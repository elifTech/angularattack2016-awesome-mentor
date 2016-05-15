import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

import {LoadingContainerComponent} from '../../components/loading-container.component';
import {GithubService} from '../../services/github.service';
import {ProfessionService} from '../../services/profession.service';
import {Level} from '../../models/level.model';
import {LevelItem} from '../../models/level-item.model';
import {toArray} from 'lodash';

@Component({
    templateUrl: '/views/specializations.html',
    directives: [
        LoadingContainerComponent,
        CORE_DIRECTIVES
    ],
    providers: [
        GithubService,
        ProfessionService
    ]
})
export class PublicSpecializationsController {
    public items:any[];
    public loading:boolean;
    public selectedLevel:Level;
    public mentorUser:any;
    public repositoryUrl:string;

    constructor(private github:GithubService, private professionService:ProfessionService) {
        this.loading = true;

        this.repositoryUrl = GithubService.publicUrl;
        let repos = github.getCurrentRepository();
        repos.getTree(res => {
            // console.info(res);

            var nodes = {};

            res = res.map(item => {
                item.data.pathParts = item.data.path.replace(/\.md/g, '').split('/');

                return item;
            });

            let plain = {};

            res.map(item => {
                let lvl = item.data.pathParts.length;

                item.parent = lvl - 2 >= 0 ? item.data.pathParts[lvl - 2] : '';
                item.id = item.data.pathParts[lvl - 1];

                plain[item.data.pathParts[lvl - 1]] = item;
            });

            var plainToTree = (dic, node) => {
                let children = [];

                if (dic) {
                    var k;
                    for (k in dic) {
                        let v = plain[k];

                        if (v['parent'] === node['id']) {
                            let child = plainToTree(dic, v);

                            if (child)
                                children.push(child);
                        }
                    }
                }

                if (children)
                    node['children'] = children;

                return node;
            };

            var k;
            for (k in plain) {
                let node = plain[k];

                if (!node['parent'])
                    nodes[node['id']] = plainToTree(plain, node);
            }

            this.items = toArray(nodes['professions']['children']);
            console.log(this.items);
            // this.items = toArray(nodes);
            this.loading = false;
        });

        github.getRepositoryUser(user => {
            this.mentorUser = user;
        })
    }

    getLevelItems(professionName:string, levelName:string) {
        console.log('getLevelItems', professionName, levelName);

        this.selectedLevel = new Level({
            name: levelName
        });

        this.loading = true;
        this.professionService
            .getLevelItems(professionName, levelName)
            .then((levelItems) => {
                console.log('levelItems', levelItems);
                this.selectedLevel.items = levelItems.map(function (item:any) {
                    return new LevelItem(item);
                });
                this.loading = false;
            });
    }
}