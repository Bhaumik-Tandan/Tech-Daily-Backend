import { Router } from 'express';
import News from '../models/news.js';

const router = Router();

router.route('/').get(async (req, res) => {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page) || 1;  // Current page (default to 1)
    const perPage = 50;  // Number of items per page

    // Calculate the skip value to start from the right index
    const skip = (page - 1) * perPage;

    // Query the database to get the sorted and paginated news
    const news = await News.find()
      .sort({ createAt: -1 })  // Sort by createAt date in descending order (newest first)
      .skip(skip)
      .limit(perPage);

    res.json(news);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
