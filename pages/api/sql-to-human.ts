import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "langchain/llms/openai";



export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {


    const { userPrompt } = req.body;
    // console.log(req.body);
    // console.log(userPrompt);

    const model = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0.9 });
    const response = await model.call(

        `Based on the prompt: '${userPrompt}', translate that SQL query into natural language.`
    );
    console.log(response);

    res.status(200).send(response.trim());
}