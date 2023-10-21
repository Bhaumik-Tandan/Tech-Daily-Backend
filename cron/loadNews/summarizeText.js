import { SummarizerManager } from "node-summarizer";

function summarizeText(text, numberOfSentences) {
    let Summarizer = new SummarizerManager(text, numberOfSentences);
    return Summarizer.getSummaryByFrequency().summary;
}

export default summarizeText;