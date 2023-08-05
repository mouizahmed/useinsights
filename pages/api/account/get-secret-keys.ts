import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { getSecretKeys } from "@/lib/supabase-admin";



export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    if (req.method !== "GET") {
        res.setHeader('Allow', 'GET');
        res.status(405).end('Method Not Allowed');
    }
    const session = await getServerSession(req, res, authOptions);

    try {
        if (!session) throw Error("No session found.");
        const { email } = req.query;
        const Secret_Keys = await getSecretKeys((email as string));

        res.status(200).json(Secret_Keys);
    } catch (err) {
        res.status(500).json({ error: (err as Error).message});
    }

}