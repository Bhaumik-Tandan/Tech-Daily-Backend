import News from '../models/news.js';

async function clearLastDayNews() {
    console.log(Date(),triggered);
    const currentDateTime = new Date();
    currentDateTime.setHours(currentDateTime.getHours() - 24);
    const iso8601Time = currentDateTime.toISOString();
    await News.deleteMany({ createdAt: { $lte: iso8601Time } });
}

export default clearLastDayNews;