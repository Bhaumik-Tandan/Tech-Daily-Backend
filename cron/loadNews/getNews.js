import getApiUrl from "./getApiUrl.js";
import axios from "axios";


async function getNews(page=1) {
  const apiUrl = await getApiUrl();
  const url = `${apiUrl}&page=${page}`;

  const res=await axios.get(url);

  const data=res.data;

  const articles=data.articles;

  if(data.totalResults>page*100)
  {
    const nextPageArticles=await getNews(page+1);
    return [...articles,...nextPageArticles];
  }

    return articles;

}

export default getNews;
