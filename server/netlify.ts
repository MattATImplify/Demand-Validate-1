import serverless from "serverless-http";
import { setupApp } from "./index";

let serverlessHandler: any;

export const handler: any = async (event: any, context: any) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    if (!serverlessHandler) {
      console.log("Initializing app...");
      const { app } = await setupApp();
      serverlessHandler = serverless(app);
    }
    
    return await serverlessHandler(event, context);
  } catch (err) {
    console.error("CRITICAL FUNCTION ERROR:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: "Critical Internal Server Error", 
        error: err instanceof Error ? err.message : String(err) 
      })
    };
  }
};
