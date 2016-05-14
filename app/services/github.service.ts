import {Injectable} from '@angular/core';

@Injectable()
export class GithubService {
    log(message: string): void {
        console.log(message);
    }
}
