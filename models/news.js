import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const newsSchema = new Schema({
    title: { type: String, required: true, unique: true },
    image: { type: String,require: true },
    summary: { type: String, required: true },
    sourceURL: { type: String, required: true, unique: true },
    publishedAt: { type: Date, required: true },
}, {
  timestamps: true,
});


const News = mongoose.model('news', newsSchema);

export default News;