import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Product service running!");
});

app.listen(port, () => {
  console.log(`Product service on port: ${port}`);
});
