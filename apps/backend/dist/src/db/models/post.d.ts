export interface IPost {
    _id: string;
    title: string;
    author?: string;
    contents: string;
    tags?: string[];
    createdAt: Date;
    updatedAt: Date;
}
export declare const Post: import("mongoose").Model<IPost, {}, {}, {}, import("mongoose").Document<unknown, {}, IPost, {}, import("mongoose").DefaultSchemaOptions> & IPost & Required<{
    _id: string;
}> & {
    __v: number;
} & {
    id: string;
}, any, IPost>;
