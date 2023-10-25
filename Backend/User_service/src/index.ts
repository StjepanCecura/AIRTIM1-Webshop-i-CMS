import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("User service running!!");
});

app.listen(port, () => {
  console.log(`User service on port: ${port}`);
});
