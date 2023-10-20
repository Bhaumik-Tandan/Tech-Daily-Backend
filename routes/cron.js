import { Router } from 'express';
import saveNewsToDB from '../cron/loadNews/saveNewsToDb';
import clearLastDayNews from '../cron/loadNews/clearLastDayNews';

const router = Router();


router.get('/loadNews', async(req, res) => {
    const cronJobKey = req.header('CRON_JOB_KEY');
    if (cronJobKey !== process.env.CRON_JOB_KEY) {
        res.send('News loaded');
    }
    await saveNewsToDB();
    res.send('News loaded');
});

router.get('/clearLastDayNews', async(req, res) => {
    const cronJobKey = req.header('CRON_JOB_KEY');
    if (cronJobKey !== process.env.CRON_JOB_KEY) {
        res.send('News cleared');
    }
    await clearLastDayNews();
    res.send('News cleared');
});


export default router;
