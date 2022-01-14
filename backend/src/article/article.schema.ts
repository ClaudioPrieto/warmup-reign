import * as mongoose from 'mongoose';

export const ArticleSchema = new mongoose.Schema({
    uid: Number,
    title: String,
    author: String,
    url: String,
    release_date: Date,
    created_at: { type: Date, default: Date.now }
})