import News from '../models/news.js';

async function clearLastDayNews() {
    console.log(Date(),"triggered");
    const currentDateTime = new Date();
    currentDateTime.setHours(currentDateTime.getHours() - 2);
    const iso8601Time = currentDateTime.toISOString();
    const newsCount = await News.countDocuments();
    if (newsCount > 100) {
        const deleted = await News.deleteMany({ createdAt: { $lte: iso8601Time } });
        return deleted.deletedCount;
    }
}

export default clearLastDayNews;