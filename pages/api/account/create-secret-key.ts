import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { addSecretKey } from "@/lib/supabase-admin";



export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    if (req.method !== "POST") {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
    const session = await getServerSession(req, res, authOptions);

    try {
        if (!session) throw Error("No session found.");
        const { email } = req.body;
        
        await addSecretKey(email);

        res.status(200).send("Successfully added secret key.");
    } catch (err) {
        res.status(500).json({ error: (err as Error).message});
    }

}