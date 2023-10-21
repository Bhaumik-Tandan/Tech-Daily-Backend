import News from '../../models/news.js';
import getNews from './getNews.js';

async function saveNewsToDb() {
    console.log(Date(), "triggered");
    try {
        const news = await getNews();
        const newsEntries = [];

        for (const article of news) {
            newsEntries.push({
                title: article.title,
                image: article.urlToImage,
                summary: article.description,
                sourceURL: article.url,
                publishedAt: Date(article.publishedAt),
            });
        }

        if (newsEntries.length > 0) {
            const inserted = await News.insertMany(newsEntries, { ordered: false });
            console.log(Date(), `${inserted.length} news inserted`);
        }
    } catch (error) {
        console.error(Date(), 'An error occurred:', error);
    }
}

export default saveNewsToDb;
