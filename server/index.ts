import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { createServer } from "http";

export async function setupApp() {
  const app = express();
  const httpServer = createServer(app);

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  await registerRoutes(httpServer, app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
  });

  return { app, httpServer };
}

// Only start the server if we're not in a serverless/test environment
if (process.env.NODE_ENV !== "test" && !process.env.NETLIFY && !process.env.FUNCTIONS_CONTROL_API) {
  (async () => {
    const { httpServer } = await setupApp();
    const port = parseInt(process.env.PORT || "5000", 10);
    httpServer.listen(port, "0.0.0.0", () => {
      console.log(`serving on port ${port}`);
    });
  })();
}
