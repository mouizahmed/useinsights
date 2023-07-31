import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "langchain/llms/openai";
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"
import { CSVLoader } from "langchain/document_loaders/fs/csv";


export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    //const session = await getServerSession(req, res, authOptions)
    const loader = new CSVLoader(
        `public/COVID19Tracker.ca Data - National.csv`
      );

    const docs = await loader.load();
    console.log(docs);
    res.status(200).json(docs);
    try {
        
    } catch (err) {
        res.status(500).json({ error: (err as Error).message});
    }

}