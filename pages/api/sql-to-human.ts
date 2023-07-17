import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "langchain/llms/openai";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
        const { userPrompt } = req.body;

        const model = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0.9 });
        const response = await model.call(
            `Based on the prompt: '${userPrompt.trim()}', translate that SQL query into natural language.`
        );
        console.log(response);

        res.status(200).send(response.trim());
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}