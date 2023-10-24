import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const newsSchema = new Schema({
    title: { type: String, required: true, unique: true },
    image: { type: String,required: true },
    summary: { type: String, required: true },
    sourceURL: { type: String, required: true, unique: true },
    publishedAt: { type: Date, required: true },
    relevance: { type: Number, required: true },
    source: { type: String, required: true },
    category: 
    { type: String, required: true,
    enum: ['business', 'tech']  
     },
}, {
  timestamps: true,
});


const News = mongoose.model('news', newsSchema);

export default News;