import cookieParser from "cookie-parser";
import express, { type Express, type Request, type Response } from "express";

const app: Express = express();
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(3000);
