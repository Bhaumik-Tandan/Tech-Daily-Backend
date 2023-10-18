import News from '../../models/news.js';
import getNews from './getNews.js';
import { v4 as uuidv4 } from 'uuid';

async function saveNewsToDb() {
    console.log(Date(),"triggered");
    const news = await getNews();
    const newsEntries = [];

    for (const article of news) {
        newsEntries.push({
            title: article.title,
            image: article.urlToImage,
            summary: article.description,
            sourceURL: article.url,
            _id: uuidv4(),
        });
    }

    if (newsEntries.length > 0) {
        await News.insertMany(newsEntries,{ordered: false});
    }
}

export default saveNewsToDb;
