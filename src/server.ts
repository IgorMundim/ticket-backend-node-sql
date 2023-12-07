import "express-async-errors";
import accountRoutes from "./routes/accountRoutes";
import eventRoutes from "./routes/eventRoutes";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import errorMiddleware from "./middleware/Error";
import swaggerDocs from "./util/swagger";

dotenv.config();

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for JSONPlaceholder',
    version: '1.0.0',
    description:
      'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'JSONPlaceholder',
      url: 'https://jsonplaceholder.typicode.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.ts'],
};


const server = express();

server.use(express.json());
server.use(
  cors({
    origin: "*",
  })
);
swaggerDocs(server, 3000)

server.use("/api/v1/account", accountRoutes);
server.use("/api/v1/event", eventRoutes);
server.use(errorMiddleware.error);


export default server;
