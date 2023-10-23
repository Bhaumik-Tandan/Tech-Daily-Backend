import SummaryTool from "node-summary";

function summarizeNews(title, content) {
    return new Promise((resolve, reject) => {
        SummaryTool.summarize(title, content, (err, summary) => {
            if (err) {
                console.log("Something went wrong man!");
                reject(err);
            } else {
                // Split the summary by newline and remove the first line (title)
                const lines = summary.split('\n');
                lines.shift(); // Remove the first line (title)
                const newSummary = lines.join('\n');
                resolve(newSummary);
            }
        });
    });
}

export default summarizeNews;
