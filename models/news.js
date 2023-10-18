import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const newsSchema = new Schema({
    title: { type: String, required: true },
    image: { type: String },
    summary: { type: String },
    sourceURL: { type: String, required: true, unique: true },
}, {
  timestamps: true,
});


const News = mongoose.model('news', newsSchema);

export default News;