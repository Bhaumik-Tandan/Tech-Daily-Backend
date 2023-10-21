import { Router } from 'express';
import News from '../models/news.js';

const router = Router();

// Get all news articles with pagination
router.route('/').get(async (req, res) => {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page) || 1;  // Current page (default to 1)
    const perPage = 50;  // Number of items per page

    // Calculate the skip value to start from the right index
    const skip = (page - 1) * perPage;

    // Query the database to get the sorted and paginated news
    const news = await News.find()
  .sort({ relevance:-1,publishedAt: -1, _id: 1 })
  .skip(skip)
  .limit(perPage);


    res.json(news);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
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
