import {Directive, Input, OnInit, OnChanges, ElementRef} from '@angular/core';

@Directive({
    selector: '[loading-container]'
})
export class LoadingContainerComponent implements OnInit,OnChanges {
    @Input() loading:boolean;

    private loadingLayer:any;

    constructor(private el:ElementRef) {
        this.loadingLayer = document.createElement('div');
        this.loadingLayer.className = 'loading hidden';
    }

    ngOnChanges() {
        // console.log('loading');
        this.loadingLayer.className = 'loading' + (this.loading ? '' : ' hidden');
    }

    ngOnInit() {
        var curClass:string = this.el.nativeElement.className;
        curClass += ' loading-container';
        curClass = curClass.replace(/  +/g, ' ');
        //console.log('curClass', curClass);
        this.el.nativeElement.className = curClass;
        this.el.nativeElement.appendChild(this.loadingLayer);
    }
}