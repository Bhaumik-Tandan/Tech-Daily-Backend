import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import NewsRouter from './routes/news.js';
import LinkRouter from './routes/link.js';
import DeepLinkRouter from './routes/.well-known.js';
import CronRouter from './routes/cron.js';
import saveNewsToDb from './cron/loadNews/saveNewsToDb.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true }
);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

app.use('/news', NewsRouter);
app.use('/link', LinkRouter);
app.use('/.well-known', DeepLinkRouter);
app.use('/cron', CronRouter);
saveNewsToDb();

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});