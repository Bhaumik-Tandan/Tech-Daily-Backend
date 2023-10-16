import News from '../../models/news.js';
import getNews from './getNews.js';

async function saveNewsToDb() {
    const news = await getNews();
    const newsEntries = [];

    for (const article of news) {
        newsEntries.push({
            title: article.title,
            image: article.urlToImage,
            summary: article.description
        });
    }

    if (newsEntries.length > 0) {
        await News.insertMany(newsEntries);
    }
}

export default saveNewsToDb;
