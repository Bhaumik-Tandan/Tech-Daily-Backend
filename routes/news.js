import { Router } from 'express';
import News from '../models/news.js';
import SummaryTool from "node-summary";
const router = Router();

// Get all news articles with pagination
router.route('/').get(async (req, res) => {
  const category = (req.query.category)?req.query.category:'tech';
  try {
    // Pagination parameters
    const page = parseInt(req.query.page) || 1;  // Current page (default to 1)
    const perPage = 10;  // Number of items per page

    // Calculate the skip value to start from the right index
    const skip = (page - 1) * perPage;

    const news = await News.find({category})
  .sort({ relevance:-1,publishedAt: -1, _id: 1 })
  .skip(skip)
  .limit(perPage)
  .select('title image summary sourceURL source');


    res.json(news);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.route('/summarize').post(async (req, res) => {
  const { url,text } = req.body;
  if(url)
  SummaryTool.summarizeFromUrl(url, function(err, summary) {
    if (err) {
      console.log("err is ", err); // Corrected error logging
      res.status(500).json({ error: 'Error summarizing content' }); // Optionally, send an error response to the client
    } else {
      res.status(200).json({ summary }); // Optionally, send the summary as a JSON response
    }
  });
  else 
  SummaryTool.summarize("",text, function(err, summary) {
    if (err) {
      console.log("err is ", err); // Corrected error logging
      res.status(500).json({ error: 'Error summarizing content' }); // Optionally, send an error response to the client
    } else {
      res.status(200).json({ summary }); // Optionally, send the summary as a JSON response
    }
  });

});



// Get a single news article by ID
router.route('/:id').get(async (req, res) => {
  try {
    const newsId = req.params.id;
    const news = await News.findById(newsId);

    if (!news) {
      return res.status(404).json({ error: 'News article not found' });
    }

    res.json(news);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
