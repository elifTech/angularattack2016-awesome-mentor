export class Profession {
    public title: string;
    public type: string;
    public rating: number;
    public done: boolean;

    public levels: string[];
    public tags: string[];
    public source: string;
    public repo: string;

    constructor(title: string, source?: string, repo?: string) {
        this.title = title;
        if(source) this.source = source;
        if(repo) this.repo = repo;
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
