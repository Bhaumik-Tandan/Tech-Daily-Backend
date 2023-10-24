import axios from "axios";
import getLastNewsTime from "./getLastNewsTime.js";
import summarizeNews from "./summarizeNews.js";

const apiUrl="https://www.newsapi.ai/api/v1/article/getArticlesForTopicPage";

const getNewsFromApi = async (pageNumber,category) => {
  const url=`${apiUrl}?articlesPage=${pageNumber}`;
  const lastTime=await getLastNewsTime();
  const body={
    "uri":category=='tech'? "d6e5a64f-196c-4776-8342-527b05a0e458":'fb73a4b5-6392-4ea6-a93a-fadffded78c8',
    "dataType": [
        "news",
        "blog"
    ],
    "resultType": "articles",
    "articlesSortBy": "date",
    "includeArticleImage": true,
    "includeConceptLabel": false,
    "includeSourceTitle": true,
    "apiKey": process.env.NEWS_API_KEY,
    "onlyAfterTm":lastTime
  }

  const res=await axios.post(url,body);

  const data=res.data.articles;
  data.map((article)=>{
    article.category=category;
  });
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
      relevance: article.relevance,
      source: article.source.title,
      category: article.category,
    };
  }));

  return structuredNews;
}


async function getNews(category='tech') {
  const allNews = []; 
  let currentNewsPage = 1,pages; 

  do {
    const response = await getNewsFromApi(currentNewsPage,category);
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
