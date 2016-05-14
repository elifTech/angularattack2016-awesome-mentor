import {Injectable} from '@angular/core';

@Injectable()
export class ConfigService {
    get repOwner() {
        return 'esvit';
    }

    get repName() {
        return 'test-repos';
    }
}
