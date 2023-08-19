
import type { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";
import { createOrRetrieveCustomer, createCheckoutSession } from "@/lib/supabase-admin";
import { Readable } from 'node:stream';

export const config = {
    api: {
        bodyParser: false
    }
};

async function buffer(readable: Readable) {
    const chunks = [];
    for await (const chunk of readable) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    return Buffer.concat(chunks);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    if (req.method !== "POST") {
        res.setHeader('Allow', 'POST');
        console.log("ERR")
        res.status(405).end('Method Not Allowed');
    }

    try {

        const endpointSecret = "whsec_d24ee72e6b6e63a0d5abdb76387f76f328ffe5edd43d654a6513acb18417a79e";
        const sig = req.headers['stripe-signature'];
        console.log("HI");


        if (!sig || !endpointSecret) return;
        let event;
        const buf = await buffer(req);
        event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);


        switch (event.type) {
            case 'payment_intent.succeeded':
                const paymentIntentSucceeded = event.data.object;
                console.log(paymentIntentSucceeded);
              
                // Then define and call a function to handle the event payment_intent.succeeded
                break;
            // ... handle other event types
            default:
                console.log(`Unhandled event type ${event.type}`);
        }








        res.status(200).send("");
    } catch (err) {
        console.log('err', err);
        res.status(500).json({ error: (err as Error).message });
    }

}