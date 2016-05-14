import {Injectable} from '@angular/core';

@Injectable()
export class ConfigService {
    static get repOwner() {
        return 'esvit';
    }

    static get repName() {
        return 'test-repos';
    }
}
