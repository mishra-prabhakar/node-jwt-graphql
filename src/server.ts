import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
// import { ApolloServer } from "apollo-server-express";
// import { buildSchema } from "type-graphql";
// import { createConnection } from "typeorm";
import cookieParser from 'cookie-parser';
// import { verify } from "jsonwebtoken";
import cors from 'cors';
import router from './routes';

const { PORT = 4000 } = process.env;
(async () => {
    const app = express();
    app.use(express.json());
    app.use(
        cors({
            origin: "http://localhost:3000",
            credentials: true,
        })
    );
    app.use(cookieParser());
    app.use("/", router);

    app.listen(PORT, () => {
        console.log(`Server is listening at port ${PORT}`);
    });
})();
