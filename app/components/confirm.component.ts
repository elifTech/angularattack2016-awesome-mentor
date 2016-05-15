import {Directive, Input, Output, ElementRef, OnInit, HostListener, EventEmitter} from '@angular/core';


@Directive({
    selector: '[confirm]'
})
export class ConfirmComponent implements OnInit {

    @Input() message:string;
    @Output() onOk = new EventEmitter();

    constructor(private el:ElementRef) {
    }

    ngOnInit() {
    }

    @HostListener('click', ['$event.target'])
    onClick(btn) {
        if (confirm(this.message)) {
            this.onOk.emit(null);
        }
    }
}