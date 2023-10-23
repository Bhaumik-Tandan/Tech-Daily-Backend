import axios from "axios";
import getLastNewsTime from "./getLastNewsTime.js";
import summarizeNews from "./summarizeNews.js";

const apiUrl="https://www.newsapi.ai/api/v1/article/getArticlesForTopicPage";

const getNewsFromApi = async (pageNumber) => {
  const url=`${apiUrl}?articlesPage=${pageNumber}`;
  const lastTime=await getLastNewsTime();
  const body={
    "uri": "d6e5a64f-196c-4776-8342-527b05a0e458",
    "dataType": [
        "news",
        "blog"
    ],
    "resultType": "articles",
    "articlesSortBy": "date",
    "includeArticleImage": true,
    "includeConceptLabel": false,
    "includeSourceTitle": false,
    "apiKey": process.env.NEWS_API_KEY,
    "onlyAfterTm":lastTime
  }

  const res=await axios.post(url,body);

  const data=res.data.articles;

  return data;
}

async function structureNews(news) {
  const structuredNews = await Promise.all(news.map(async (article) => {
    return {
      title: article.title,
      image: article.image,
      summary: await summarizeNews(article.title, article.body),
      sourceURL: article.url,
      publishedAt: new Date(article.dateTimePub), // Use 'new Date' to create a Date object
      relevance: article.relevance
    };
  }));

  return structuredNews;
}


async function getNews() {
  const allNews = []; 
  let currentNewsPage = 1,pages; 

  do {
    const response = await getNewsFromApi(currentNewsPage);
    const {results} = response;
    pages=response.pages;

    if (results && results.length > 0) {
      allNews.push(...results); 
      currentNewsPage++; 
    } else {
      break;
    }
  } while (currentNewsPage <= pages);

  const structuredNews = await structureNews(allNews);

  return structuredNews;
}

export default getNews;
