import { Injectable } from '@angular/core';

@Injectable()
export class TetherService {
    private shepherd: any;

    public next;
    public back;
    public cancel;

    constructor() {
        this.shepherd = new (<any>window).Shepherd.Tour({
            defaults: {
                classes: 'shepherd-element shepherd-open shepherd-theme-arrows',
                showCancelLink: true
            }
        });

        this.next = this.shepherd.next;
        this.back = this.shepherd.back;
        this.cancel = this.shepherd.cancel;
    }

    public addStep(title: string, params: Object){
        this.shepherd.addStep(title, params);
    }

    public startShepherd(){
        return this.shepherd.start();
    }
}