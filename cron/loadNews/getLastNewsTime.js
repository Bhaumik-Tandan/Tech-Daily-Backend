import News from '../../models/news.js';

function getLastHourTime() {
    const currentDateTime = new Date();

// Subtract one hour (3600 seconds) from the current time
currentDateTime.setHours(currentDateTime.getHours() - 3);

// Format it as "2023-10-16T07:04:18"
const iso8601Time = currentDateTime.toISOString().slice(0, 19);

 return iso8601Time;
}

async function getLastNewsTime(category) {
    try {
        const latestNews = await News.findOne({category}).sort({ publishedAt: -1 });

        if (latestNews) {
            // Format the createdAt timestamp in ISO 8601 format
            const iso8601Time = latestNews.publishedAt.toISOString();

            return iso8601Time;
        } else {
            return getLastHourTime(); // Handle the case where no news entries are found
        }
    } catch (error) {
        console.error(error);
        return getLastHourTime();
    }
}

export default getLastNewsTime;
