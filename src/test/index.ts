import { Request, Response } from "express";

export default app => {
  app.get("/test", async (req: Request, resp: Response) => {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    resp.json({ ip });
  });
};
