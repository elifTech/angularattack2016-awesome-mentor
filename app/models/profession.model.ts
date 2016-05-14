export class Profession {
    public title: string;
    public type: string;
    public rating: number;
    public source: string;
    public done: boolean;

    constructor(title: string) {
        this.title = title;
        // this.type = type;
        // this.source = source;
    }

    rate(rating: number) {
        this.rating = rating;
    }

    close(isDone: boolean, rating: number) {
        this.rate(rating || 0);
        this.done = isDone;
    }
}
