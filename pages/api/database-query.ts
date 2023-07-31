import type { NextApiRequest, NextApiResponse } from "next";
import mysql from "serverless-mysql";
import { DataSource } from "typeorm";
import { OpenAI } from "langchain/llms/openai";
import { SqlDatabase } from "langchain/sql_db";
import { SqlDatabaseChain } from "langchain/chains/sql_db";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {

        const { credentials, limit, prompt } = req.body;
        console.log(limit);
        const datasource = new DataSource({
            type: "mysql",
            host: credentials.host, // '127.0.0.1',
            port: credentials.port, // 3306,
            username: credentials.user, // 'root',
            password: credentials.password, // 'password',
            database: credentials.database, // 'classicmodels'
        });

        const db = await SqlDatabase.fromDataSourceParams({
            appDataSource: datasource
        });

        const chain = new SqlDatabaseChain({
            llm: new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo-16k' }),
            database: db,
            sqlOutputKey: "sql",
        });

        const response = await chain.call({
            query: `${prompt}. (${limit === "Unlimited"
                ? "Include all available rows (DO NOT LIMIT to 5)"
                : limit !== "5"
                    ? `strictly limit to ${limit} row(s).`
                    : ""} Do not stop until you have all data ${limit === "5"
                        ? "LIMIT TO 5"
                        : ""} and complete the chart array with all the data. Strictly return a json. Strictly using this FORMAT and naming: chart: [{ "name": "a", "value1": 12, "value2": 12 }]. Make sure field name always stays named name. Instead of naming 'value' field value in JSON, name it based on column metric and make it the same across every item. You can add more values if necessary).) Inside the json make a second object called "final_answer" with the final answer in natural language.`,
        });
        console.log(response.result);

        const output = {
            "result": JSON.parse(response.result),
            "sql": response.sql
        }

        res.status(200).json(output);
    } catch (err) {
        console.error(err);
        //console.log(err);
        res.status(500).json({ error: err }); // fix
    }
}