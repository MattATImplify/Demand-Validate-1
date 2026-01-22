import serverless from "serverless-http";
import { setupApp } from "./index";

let serverlessHandler: any;

export const handler: any = async (event: any, context: any) => {
  if (!serverlessHandler) {
    const { app } = await setupApp();
    // This tells serverless-http that all our routes start with /api
    // which matches our shared/routes.ts definitions
    serverlessHandler = serverless(app, {
      basePath: "/api"
    });
  }
  
  // Netlify provides the path in event.path
  // We need to make sure it matches what Express expects
  return serverlessHandler(event, context);
};
