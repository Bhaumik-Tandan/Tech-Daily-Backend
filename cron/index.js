import cron from 'node-cron';
import saveNewsToDb from './loadNews/saveNewsToDb.js';
import clearLastDayNews from './clearLastDayNews.js';

function cronInit() {
    cron.schedule('0 * * * *', saveNewsToDb);
    // cron.schedule('0 0 * * *', clearLastDayNews);
    cron.schedule('0 0 */2 * *', clearLastDayNews);
}

export default cronInit;