import mongoose from "mongoose";
import  express  from "express";
import dotenv from 'dotenv';
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import connectDB from "./db";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";

dotenv.config();
const port = 3000;
const app = express();
app.use(express.json());

// Start and connect Apollo server
const server = new ApolloServer({typeDefs, resolvers})
server.start().then(e => {
    app.use("/graphql", expressMiddleware(server, {
    context: async () => ({}),
}))

})

// Connect to MongdoDB
connectDB()
.then(e => console.log('connected to mongoDB'))
.catch(error => {
    console.error('Issue running server', error)
})

// Start server
app.listen(port, () => {
    console.log(`running on`, port)
})

