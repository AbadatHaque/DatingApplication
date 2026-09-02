import cookieParser from "cookie-parser";
import express, { type Express, type Request, type Response } from "express";
// import { routes } from "./src/routes/index";
import {routes} from "./src/routes/index.js";
const app: Express = express();
app.use(cookieParser());

app.use("/", routes);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(3000);
