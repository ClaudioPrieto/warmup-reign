import { Document } from 'mongoose';

export interface Article extends Document {
    readonly title: String,
    readonly author: String,
    readonly url: String,
    readonly release_date: Date,
    readonly created_at: Date;
}