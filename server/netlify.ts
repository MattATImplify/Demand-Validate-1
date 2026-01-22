import serverless from "serverless-http";
import { setupApp } from "./index";

let serverlessHandler: any;

export const handler: any = async (event: any, context: any) => {
  if (!serverlessHandler) {
    const { app } = await setupApp();
    // serverless-http handles the /.netlify/functions/api prefix
    // by using it as the base path for Express routing
    serverlessHandler = serverless(app);
  }
  return serverlessHandler(event, context);
};
