export class Level {
    public name: string;
    public items: any;

    constructor(raw: any) {
        // if(typeof(raw) == "string") {
        //     this._parse(raw);
        // } else {
        //     this.name = raw.name;
        // }
        //console.log('raw', raw);
    }

    private _parse(str:string)
    {
    }

    public toMd()
    {
        return '';
    }
}
