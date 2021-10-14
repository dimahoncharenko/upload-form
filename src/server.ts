import "reflect-metadata";
import express from "express";
import { createServer } from "http";
import { ApolloServer } from "apollo-server-express";
import { graphqlUploadExpress } from "graphql-upload";
import { PubSub } from "graphql-subscriptions";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import expPlay from "graphql-playground-middleware-express";
import cors from "cors";
import { readFileSync } from "fs";
import { config } from "dotenv";
import { resolve } from "path";

import resolvers from "./graphql/resolvers";
import { connect } from "./utils";
import PhotoService from "./services/PhotoService";

config();
const typeDefs = readFileSync(resolve("src/graphql/typeDefs.graphql"), "utf8");
const schema = makeExecutableSchema({ typeDefs, resolvers });
const service = new PhotoService();
export const pubsub = new PubSub();

export type Context = {
    service: PhotoService
}

(async () => {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static("assets"));
    app.use("/playground", expPlay({
        endpoint: "/graphql",
        subscriptionEndpoint: "/graphql"
    }));
    app.use(graphqlUploadExpress());

    await connect();

    const apolloServer = new ApolloServer({
        schema,
        context: ({ req }) => {
            
            return { service };
        }
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    const httpServer = createServer(app);

    SubscriptionServer.create({
        execute, 
        subscribe,
        schema
    }, {
        server: httpServer,
        path: apolloServer.graphqlPath
    });

    httpServer.listen(process.env.PORT, () => {
        console.log(`Server ready at port: ${process.env.PORT}!`);
    });
})();
