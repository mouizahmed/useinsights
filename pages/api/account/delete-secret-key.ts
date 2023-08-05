import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { deleteSecretKey } from "@/lib/supabase-admin";



export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    if (req.method !== "DELETE") {
        res.setHeader('Allow', 'DELETE');
        res.status(405).end('Method Not Allowed');
    }
    const session = await getServerSession(req, res, authOptions);

    try {
        if (!session) throw Error("No session found.");
        const { api_key } = req.query;
        console.log(api_key);
        
        await deleteSecretKey((api_key as string));

        res.status(200).send("Successfully added secret key.");
    } catch (err) {
        res.status(500).json({ error: (err as Error).message});
    }

}