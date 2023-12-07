import { Express, Request, Response } from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"

import {version} from '../../package.json'

const options: swaggerJsDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API Docs",
      version,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
          "./src/routes/accountRoutes.ts",
          "./src/routes/eventRoutes.ts",
          "./src/models/Account.ts", 
          "./src/models/AuthenticateAccount.ts",
          "./src/models/AccountAddress.ts",
          "./src/models/Event.ts", 
          "./src/models/Batch.ts", 
          "./src/models/Leasing.ts", 
          "./src/models/Category.ts", 
          "./src/models/EventAddress.ts", 
          "./src/models/Image.ts",
        ],
};

const swaggerSpec = swaggerJsDoc(options);

function swaggerDocs(app: Express, port: number) {
  // Swagger page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get("/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

}

export default swaggerDocs;