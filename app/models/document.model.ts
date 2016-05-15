import {PublicLevelItem} from "./public-level-item.model";

export class DocumentModel {
    public type: string;
    public id: string;
    public courses: PublicLevelItem[];
    public name: string;
    public modified: string;
    public resource: any;
}