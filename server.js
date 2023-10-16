import express from 'express';
import cors from 'cors';
import mongoose, { get } from 'mongoose';
import dotenv from 'dotenv';
import NewsRouter from './routes/news.js';
import cronInit from './cron/index.js';
import getApiUrl from './cron/loadNews/getApiUrl.js';

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

cronInit();

getApiUrl();
app.use('/news', NewsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});