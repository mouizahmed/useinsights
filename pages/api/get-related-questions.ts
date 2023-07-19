import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "langchain/llms/openai";



export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {

        const { chartData, chartPrompt } = req.body;
        const model = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0.9, maxRetries: 0 });
        console.log(chartData);
        const response = await model.call(

            `Generate 5 related questions that a user may ask to gain a better insight on the data: ${chartData} and this title: ${chartPrompt}' generate a valid JSON strictly using this FORMAT and naming:
            [{ "question": "a" }]. Make sure field question always stays named question. \n Provide JSON data only.`
        );
        console.log(response);

        res.status(200).json(JSON.parse(response.trim()));
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}