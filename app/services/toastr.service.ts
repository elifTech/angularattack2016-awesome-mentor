import { Injectable } from '@angular/core';
import * as toastr from 'toastr';

@Injectable()
export class ToastrService {

    constructor() {
        console.log('ToastrService constructor', toastr);
        toastr.options = {
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
        toastr.info(msg);
    }

    public success(msg:string) {
        //console.log('ToastrService success', msg);
        toastr.success(msg);
    }

    public error(msg:string) {
        //console.log('ToastrService success', msg);
        toastr.error(msg);
    }
}