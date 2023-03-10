import { InstaMedia } from "./InstaMedia";

export class InstaPost {
    
    constructor(
        public id: string,
        public carousel: InstaMedia[]
    ) {}
}