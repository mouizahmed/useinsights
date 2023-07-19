import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "langchain/llms/openai";



export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {

        const { userPrompt, chartType } = req.body;
        const model = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0.9, maxRetries: 0, maxTokens: 1000 });

        const response = await model.call(

            `Based on '${userPrompt}' generate a valid JSON in which each element is an object for Recharts API for chart '${chartType}' without new line characters '\n'. Strictly using this FORMAT and naming:
[{ "name": "a", "value1": 12, "value2": 12 }]. Make sure field name always stays named name. Instead of naming value field value in JSON, name it based on user metric and make it the same across every item. You can add more values (values3, values4, and so on if necessary). \n Provide JSON data only. Do not finish until you get all the valid data.`
        );
        console.log(response);

        res.status(200).json(JSON.parse(response.trim()));
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}