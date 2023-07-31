import type { NextApiRequest, NextApiResponse } from "next";
import mysql from "serverless-mysql";


export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {

        const { credentials } = req.body;

        // const db = mysql({
        //     config: {
        //         host: "127.0.0.1",
        //         port: 3306,
        //         database: "flashstudy",
        //         user: "root",
        //         password: "password"
        //     }
        // })
        console.log(credentials);
        const db = mysql({
            config: credentials
        })


        await db.connect();
        db.end();

        res.status(200).send("Connection established!");
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err }); // fix
    }
}