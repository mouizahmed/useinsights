import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { setOpenAI } from "@/lib/supabase-admin";



export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    if (req.method !== "PUT") {
        res.setHeader('Allow', 'PUT');
        res.status(405).end('Method Not Allowed');
    }
    const session = await getServerSession(req, res, authOptions);

    try {
        if (!session) throw Error("No session found.");
        const { openAI, userID } = req.body;
        
        await setOpenAI(openAI, userID);

        res.status(200).send("Successfully updated OpenAI key.");
    } catch (err) {
        res.status(500).json({ error: (err as Error).message});
    }

}