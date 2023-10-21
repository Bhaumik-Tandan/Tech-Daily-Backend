import { Router } from 'express';
import saveNewsToDB from '../cron/loadNews/saveNewsToDb.js';
import clearLastDayNews from '../cron/clearLastDayNews.js';

const router = Router();


router.get('/loadNews', async(req, res) => {
    const cronJobKey = req.header('CRON_JOB_KEY');
    if (cronJobKey !== process.env.CRON_JOB_KEY) {
        res.send('News loaded 0');
    }
    const numberOfNews=await saveNewsToDB();
    res.send('News loaded'+numberOfNews);
});

router.get('/clearLastDayNews', async(req, res) => {
    const cronJobKey = req.header('CRON_JOB_KEY');
    if (cronJobKey !== process.env.CRON_JOB_KEY) {
        res.send('News cleared 0');
    }
    const deleted=await clearLastDayNews();
    res.send('News cleared'+deleted);
});


export default router;
