import { Injectable } from '@angular/core';

@Injectable()
export class ToastrService {

    constructor() {
         console.log('ToastrService constructor', (<any>window).toastr);
        (<any>window).toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": true,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "3000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
    }

    public info(msg:string) {
        (<any>window).toastr.info(msg);
    }

    public success(msg:string) {
        //console.log('ToastrService success', msg);
        (<any>window).toastr.success(msg);
    }

    public error(msg:string) {
        //console.log('ToastrService success', msg);
        (<any>window).toastr.error(msg);
    }
}