import "reflect-metadata";

import http from "http";
import express from "express";
import { buildSchema } from "type-graphql";
import { SomeResolver } from "./resolvers";
import { ApolloServer } from "apollo-server-express";
import { applyMiddleware } from "graphql-middleware";
import { permissions } from "./permissions";

async function buildServer(): Promise<{ server: ApolloServer }> {    // build TypeGraphQL executable schema
    let schema = await buildSchema({
        resolvers: [SomeResolver],
    });

    // Apply permissions layer middleware
    schema = applyMiddleware(schema, permissions);

    const server = new ApolloServer({
        schema,
    });

    return {
        server
    };
}

// bootstrap server
async function bootstrap() {
    // continue with server setup
    const PORT = 8080;
    const GRAPHQL_PATH = "/graphql";

    const app = express();
    const { server: gqlServer } = await buildServer();

    gqlServer.applyMiddleware({
        app,
        path: GRAPHQL_PATH,
    });

    const httpServer = http.createServer(app);

    // listen
    httpServer.listen(PORT, () => {
        console.log(`[GRAPHQL] Server ready at http://localhost:${PORT}${gqlServer.graphqlPath}`);
    });
}

bootstrap();
