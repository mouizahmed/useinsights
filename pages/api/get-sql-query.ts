import type { NextApiRequest, NextApiResponse } from "next";
//import { getUserCredits } from "../../util/helper"
import { OpenAI } from "langchain/llms/openai";
import cookie from 'cookie';


export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
        const { userPrompt } = req.body;
        // console.log(req.body);
        // console.log(userPrompt);

        const model = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0.9 });
        const response = await model.call(

            `Based on the prompt: '${userPrompt.trim()}', generate a sql query that achieves that action.`
        );
        console.log(response);


        res.status(200).send(response.trim());
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}