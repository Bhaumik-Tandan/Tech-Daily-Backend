import getLastNewsTime from "./getLastNewsTime.js";
async function getApiUrl()
{
    const apiKeys=JSON.parse(process.env.NEWS_API_KEYS);
    const randomIndex = Math.floor(Math.random() * apiKeys.length);
    const apiKey = apiKeys[randomIndex];
    const queryStrings = {
        q: 'JavaScript OR node OR Web development OR Front-end development OR JavaScript frameworks OR Node.js OR Server-side JavaScript OR JavaScript libraries OR Node.js ecosystem',
        apiKey,
        language: 'en',
        from: await getLastNewsTime(),
        sortBy: 'relevancy',
      };

    const baseUrl = 'https://newsapi.org/v2/everything';

    const apiUrl = `${baseUrl}?q=${queryStrings.q}&apiKey=${queryStrings.apiKey}&language=${queryStrings.language}&from=${queryStrings.from}&sortBy=${queryStrings.sortBy}`;
    return apiUrl;
}
export default getApiUrl;
