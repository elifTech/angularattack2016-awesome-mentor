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

/*
 tether.addStep('welcome', {
            text: ['Shepherd is a javascript library for guiding users through your app. It uses <a href="http://github.hubspot.com/tether/">Tether</a>, another open source library, to position all of its steps.', 'Tether makes sure your steps never end up off screen or cropped by an overflow. Try resizing your browser to see what we mean.'],
            attachTo: '.hero-welcome bottom',
            classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
            buttons: [
                {
                    text: 'Exit',
                    classes: 'shepherd-button-secondary',
                    action: tether.cancel
                }, {
                    text: 'Next',
                    action: tether.next,
                    classes: 'shepherd-button-example-primary'
                }
            ]
        });

 tether.addStep('including', {
            title: 'Including',
            text: 'Including Shepherd is easy! Just include shepherd.js, and a Shepherd theme file.',
            attachTo: '.hero-including bottom',
            buttons: [
                {
                    text: 'Back',
                    classes: 'shepherd-button-secondary',
                    action: tether.back
                }, {
                    text: 'Next',
                    action: tether.next
                }
            ]
        });

 tether.addStep('example', {
            title: 'Example Shepherd',
            text: 'Creating a Shepherd is easy too! Just create Shepherd and add as many steps as you want. Check out the <a href="http://github.hubspot.com/shepherd">documentation</a> to learn more.',
            attachTo: '.hero-example bottom',
            buttons: [
                {
                    text: 'Back',
                    classes: 'shepherd-button-secondary',
                    action: tether.back
                }, {
                    text: 'Next',
                    action: tether.next
                }
            ]
        });

 tether.addStep('followup', {
            title: 'Learn more',
            text: 'Star Shepherd on Github so you remember it for your next project',
            attachTo: '.hero-followup bottom',
            buttons: [
                {
                    text: 'Back',
                    classes: 'shepherd-button-secondary',
                    action: tether.back
                }, {
                    text: 'Done',
                    action: tether.next
                }
            ]
        });

 tether.startShepherd();
 */