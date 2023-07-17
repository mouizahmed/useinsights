import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "langchain/llms/openai";
import cookie from 'cookie';
//import { useSession, signIn, signOut } from "next-auth/react";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {


    if (req.method === "GET") {
        const cookies = cookie.parse(req.headers.cookie || '');
        let cookieCredits = null;

        // parseInt(cookies.credits)
        if (!cookies.credits) {
            res.setHeader('Set-Cookie', cookie.serialize('credits', "3", {
                path: '/',
                // httpOnly: true,
                maxAge: 60, // 1 week
                sameSite: 'lax'
            }));
        } else {
            cookieCredits = cookies.credits;
        }


        res.status(200).json({credits: cookieCredits});
    }

    if (req.method === "PUT") {

    }



    // try {
    //     const {session} = req.body;
    //     if (!session) {
    //         const cookies = cookie.parse(req.headers.cookie || '');
    //         const cookieCredits = parseInt(cookies.credits);

    //         if (!cookies.credits) {
    //             res.setHeader(
    //                 'Set-Cookie',
    //                 cookie.serialize('credits', "3", {
    //                     path: '/',
    //                     maxAge: 60 * 60 * 24 * 7, // 1 week
    //                     sameSite: 'lax',
    //                 })
    //             );
    //         }


    //         if (cookieCredits > 0) {
    //             res.setHeader(
    //                 'Set-Cookie',
    //                 cookie.serialize('credits', (cookieCredits - 1).toString(), {
    //                     path: '/',
    //                     maxAge: 60 * 60 * 24 * 7, // 1 week
    //                     sameSite: 'lax',
    //                 })
    //             );
    //         } else {
    //             throw new Error();
    //         }
    //     } else {

    //     }


    //     res.status(200).send("Cookie updated successfully");
    // } catch (err) {
    //     console.error(err);
    //     res.status(500).json({ error: "Not Enough Credits" });
    // }
}