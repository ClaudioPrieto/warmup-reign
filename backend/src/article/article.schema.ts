import * as mongoose from 'mongoose';

export const ArticleSchema = new mongoose.Schema({
    uid: Number,
    title: String,
    author: String,
    url: String,
    deleted: { type: Boolean, default: false },
    release_date: Date,
    created_at: { type: Date, default: Date.now }
})