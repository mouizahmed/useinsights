import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "langchain/llms/openai";



export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const model = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0.9 });

    const response = await model.call(
        
        `Based on 'show me a bar chart of COVID-19 cases in london in march 2020' generate a valid JSON in which each element is an object for Recharts API for chart 'bar' without new line characters '\n'. Strictly using this FORMAT and naming:
[{ "name": "a", "value": 12 }]. Make sure field name always stays named name. Instead of naming value field value in JSON, name it based on user metric and make it the same across every item.\n Make sure the format use double quotes and property names are string literals. Provide JSON data only.`
      );
      console.log(response);

    res.status(200).json(JSON.parse(response.trim()));
}