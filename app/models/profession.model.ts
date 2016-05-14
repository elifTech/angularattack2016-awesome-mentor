export class Profession {
    public name: string;
    public type: string;
    public rating: number;
    public done: boolean;

    public levels: string[] = [];
    public tags: string[] = [];
    public repo: string;

    constructor(raw: any, repo?: string) {
        if(typeof(raw) == "string") {
            this._parse(raw);
        } else {
            this.name = raw.name;
        }
        //console.log('raw', raw);

        if(repo) this.repo = repo;
    }

    private _parse(str:string)
    {
        var parts = str.split("\n");

        this.name = parts[0].replace('#', '').trim();
        this.tags = parts[2].split(',');
    }

    setRepo(repo: string) {
        this.repo = repo;
    }

    rate(rating: number) {
        this.rating = rating;
    }

    close(isDone: boolean, rating: number) {
        this.rate(rating || 0);
        this.done = isDone;
    }
}
