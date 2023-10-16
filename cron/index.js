import cron from 'node-cron';
import saveNewsToDb from './loadNews/saveNewsToDb.js';
import clearLastDayNews from './clearLastDayNews.js';

function cronInit() {
    cron.schedule('0 * * * *', saveNewsToDb);
    cron.schedule('0 0 * * *', clearLastDayNews);
}

export default cronInit;