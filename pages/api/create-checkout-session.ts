
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { createOrRetrieveCustomer, createCheckoutSession } from "@/lib/supabase-admin";



export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    if (req.method !== "POST") {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
    const session = await getServerSession(req, res, authOptions);

    try {
        if (!session) throw Error("No session found.");
        
        let { quantity } = req.body;

        if (!quantity) quantity = 1;


        const customerID = await createOrRetrieveCustomer(session.user);
        const checkout = await createCheckoutSession(customerID, quantity);
        console.log(checkout);
        res.status(200).json({ url: checkout });
    } catch (err) {
        console.log('err', err);
        res.status(500).json({ error: (err as Error).message});
    }

}