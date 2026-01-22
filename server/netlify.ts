import serverless from "serverless-http";
import { setupApp } from "./index";

let serverlessHandler: any;

export const handler: any = async (event: any, context: any) => {
  if (!serverlessHandler) {
    const { app } = await setupApp();
    serverlessHandler = serverless(app);
  }
  return serverlessHandler(event, context);
};
