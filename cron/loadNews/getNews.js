import axios from "axios";
import getLastNewsTime from "./getLastNewsTime.js";
import summarizeText from "./summarizeText.js";

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

function structureNews(news) {
  return news.map((article) => {
   return{ 
    title: article.title,
    image: article.image,
    summary: summarizeText(article.body,3),
    sourceURL: article.url,
    publishedAt: Date(article.dateTimePub),
    body: article.body,
    relevance: article.relevance
   }
  });
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

  const structuredNews = structureNews(allNews);

  return structuredNews;
}

export default getNews;
