import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "langchain/llms/openai";
import cookie from "cookie";



export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
        const { userPrompt } = req.body;
        console.log(req.body);
        console.log(userPrompt);
        
        const cookies = cookie.parse(req.headers.cookie || '');
        console.log(cookies);
        res.setHeader(
            'Set-Cookie',
            cookie.serialize('available_credits', "3", {
              path: '/',
              maxAge: 60 * 60 * 24 * 7, // 1 week
              sameSite: 'lax',
            })
          );
        const model = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0.9 });
        // 'show me a line chart of COVID-19 cases in london in march 2020'
    const response = await model.call(
        `Only valid chart types: Types['Bar', 'Area', 'Line', 'Pie', 'Scatter']. If the specified chart is 'random', return 'random'. If the specified chart type is not within the valid chart type array listed, return 'Not Valid'. If no type is specified within the prompt, return 'Bar'. Based on prompt: '${userPrompt}', return what chart type is being requested.`
    )
      console.log(response);

    //res.status(200).json(JSON.parse(response.trim()));
    res.status(200).send(response.trim());
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
    
}