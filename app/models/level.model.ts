import {LevelItem} from "../models/level-item.model";

export class Level {
    public name: string;
    public oldName: string;
    public isDeleted: boolean = false;
    public isRenamed: boolean = false;
    public isNew: boolean = false;
    public items: LevelItem[] = [];

    constructor(raw: any) {
        if(typeof(raw) == "string") {
            this._parse(raw);
        } else {
            this.oldName = this.name = raw.name;
        }
        //console.log('raw', raw);
    }

    private _parse(element:string)
    {
        
    }

    public toMd()
    {
        var markdown = '# ' + this.name + "\n\n";
        this.items.forEach((item:LevelItem) => {
            markdown += item.toMd();
        })
        return markdown;
    }
}
