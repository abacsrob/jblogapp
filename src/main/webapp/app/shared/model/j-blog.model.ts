export interface IJBlog {
    id?: number;
    title?: string;
    body?: any;
    author?: string;
}

export class JBlog implements IJBlog {
    constructor(public id?: number, public title?: string, public body?: any, public author?: string) {}
}
