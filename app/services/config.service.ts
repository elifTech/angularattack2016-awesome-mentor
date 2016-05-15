import {Injectable} from '@angular/core';

@Injectable()
export class ConfigService {
    static get repOwner() {
        return 'rumblex';
    }

    static get repName() {
        return 'angularattack2016-eliftech';
    }
}
