import {
    Component
} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES, CanActivate} from '@angular/router-deprecated';
import {LoadingContainerComponent} from '../../components/loading-container.component';
import {Profession} from '../../models/profession.model';
import {ProfessionService} from '../../services/profession.service';
import {AuthService} from '../../services/auth.service';
import 'rxjs/Rx';

@Component({
    templateUrl: '/views/mentor/professions.html',
    directives: [
        CORE_DIRECTIVES,
        LoadingContainerComponent,
        ROUTER_DIRECTIVES
    ],
    providers: [
        ProfessionService
    ]
})
@CanActivate(AuthService.canComponentActivate)
export class MentorProfessionsController {
    public loading:boolean;
    public doc: Profession;
    public docs: Profession[];
    public errorMessage: string;

    constructor(private professionService: ProfessionService){
        //console.log('MentorProfessionsController');

        this.loading = true;
        this.professionService
            .list()
            .then((docs) => {
                this.docs = docs;
                this.loading = false;
            });
    }
    
}