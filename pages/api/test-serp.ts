import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "langchain/llms/openai";
import { SerpAPI } from "langchain/tools";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { WebBrowser } from "langchain/tools/webbrowser";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
        const model = new OpenAI({ temperature: 0 });
        const embeddings = new OpenAIEmbeddings();
        const tools = [
            new SerpAPI(process.env.SERPAPI_API_KEY, {
                location: "Toronto,Ontario,Canada",
                hl: "en",
                gl: "us",
            }),
            new WebBrowser({ model, embeddings }),
        ];

        const browser = new WebBrowser({ model, embeddings });

        const result = await browser.call(
          `"https://www.publichealthontario.ca/en/Data-and-Analysis/Infectious-Disease/COVID-19-Data-Surveillance/COVID-19-Data-Tool?tab=overview","Based on 'daily covid-19 cases from aug 1 2022 to aug 5 2022' generate a valid JSON in which each element is an object for Recharts API for chart 'bar' without new line characters '\n'. Strictly using this FORMAT and naming:
          [{ "name": "a", "value1": 12, "value2": 12 }]. Make sure field name always stays named name. Instead of naming value field value in JSON, name it based on user metric and make it the same across every item. You can add more values (values3, values4, and so on if necessary). \n Provide JSON data only. Do not finish until you get all the valid data."`
        );
      
        console.log(result);
        res.status(200).send("ff");
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}