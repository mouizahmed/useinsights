import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { addSecretKey } from "@/lib/supabase-admin";
import fs from 'fs';
import formidable, { errors as formidableErrors } from 'formidable';
import { CSVLoader } from "langchain/document_loaders/fs/csv";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { PineconeClient } from "@pinecone-database/pinecone";


export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    if (req.method !== "POST") {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
    const session = await getServerSession(req, res, authOptions);
    const embeddings = new OpenAIEmbeddings();
    const pinecone = new PineconeClient();
    await pinecone.init({
        environment: "us-west1-gcp-free",
        apiKey: "99361a4a-769b-47ef-8ba1-f5f95f07c1db",
    });
    const pineconeIndex = pinecone.Index("useinsights");
    const pineconeStore = new PineconeStore(embeddings, { pineconeIndex });
    try {
        if (!session) throw Error("No session found.");
        const form = formidable({});

        const formData = new Promise((resolve, reject) => {
            form.parse(req, async (err, fields, files) => {
                if (err) {
                    reject('error');
                }
                resolve({ fields, files });
            });
        });
        const { fields, files } = (await formData) as any;
        console.log(files);
        const loader = new CSVLoader(files.media[0].filepath);

        const docs = await loader.load();

        const data = docs.map((document) => document.pageContent);
        console.log(data);

        //const ids = await pineconeStore.addDocuments(docs).catch((err) => {console.log(err);});

        //const results = await pineconeStore.similaritySearch("john", 1);
        //console.log(results);
        //console.log(docs);
        console.log(docs[0].pageContent.match(/([^\n]+):/g)?.map(key => key.replace(/"|:/g, '')));
        res.status(200).send("Successfully added secret key.");
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }



}

export const config = {
    api: {
        bodyParser: false,
    },
};