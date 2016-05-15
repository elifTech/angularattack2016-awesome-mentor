import {Base64Service} from '../services/base64.service';

export class CourseModel {
    public checked: boolean = false;
    public starred: boolean = false;
    public blacklist: boolean = false;

    constructor() {

    }

    toBase64() {

    }

    fromBase64(raw) {
        var result = Base64Service.decode(raw);
    }
}