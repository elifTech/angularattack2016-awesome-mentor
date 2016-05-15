import {Base64Service} from '../services/base64.service';
import {LevelItem} from './level-item.model';

export class PublicLevelItem extends LevelItem{
    public checked: boolean = false;
    public starred: boolean = false;
    public blacklist: boolean = false;

    constructor(raw: any) {
        super(raw);
    }

    toJson() {
        return JSON.stringify(this);
    }

    fromBase64(raw) {
        var result = Base64Service.decode(raw);
    }
}