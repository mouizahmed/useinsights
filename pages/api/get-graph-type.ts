import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "langchain/llms/openai";
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"



export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const session = await getServerSession(req, res, authOptions)

    try {
        if (!session) throw Error("No session found.");
        const { userPrompt, type } = req.body;
        console.log(req.body);
        console.log(userPrompt);

        const model = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0.9, maxRetries: 0 });
        // 'show me a line chart of COVID-19 cases in london in march 2020'
        const response = await model.call(
            `Only valid chart types: Types['Bar', 'Area', 'Line', 'Pie', 'Scatter']. If the specified chart is 'random', return 'random'. If no type is specified within the prompt, return ${type}. If the specified chart type is not within the valid chart type array listed, return 'Not Valid'. Based on prompt: '${userPrompt}', return what chart type is being requested.`,

        )
        console.log(response);

        //res.status(200).json(JSON.parse(response.trim()));
        res.status(200).send(response.trim());
    } catch (err) {
        res.status(500).json({ error: (err as Error).message});
    }

}