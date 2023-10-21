import News from '../../models/news.js';
import getNews from './getNews.js';

async function saveNewsToDb() {
    console.log(Date(), "triggered");
    try {
        const newsEntries  = await getNews();

        if (newsEntries.length > 0) {
            const inserted = await News.insertMany(newsEntries, { ordered: false });
            console.log(Date(), `${inserted.length} news inserted`);
        }
        return newsEntries.length;
    } catch (error) {
        console.error(Date(), 'An error occurred:', error);
    }
}

export default saveNewsToDb;
