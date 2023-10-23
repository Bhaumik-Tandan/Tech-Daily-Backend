import SummaryTool from "node-summary";

function summarizeNews(title, content) {
    return new Promise((resolve, reject) => {
        SummaryTool.summarize(title, content, (err, summary) => {
            if (err) {
                console.log("Something went wrong man!");
                reject(err);
            } else {
                // Replace single line breaks with double line breaks
                summary = summary.replace(/\n/g, '\n\n');

                // Split the summary by double line breaks and remove the first line (title)
                const lines = summary.split('\n\n');
                lines.shift(); // Remove the first line (title)

                // Combine sentences until the summary has 60 or fewer words
                let wordCount = 0;
                const newSummary = [];
                for (const line of lines) {
                    const words = line.split(/\s+/);
                    if (wordCount + words.length <= 60) {
                        newSummary.push(line);
                        wordCount += words.length;
                    } else {
                        break;
                    }
                }

                resolve(newSummary.join('\n\n'));
            }
        });
    });
}

export default summarizeNews;