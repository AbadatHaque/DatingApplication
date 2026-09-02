import cookieParser from "cookie-parser";
import express, { type Express, type Request, type Response } from "express";
// import { routes } from "./src/routes/index";
import { routes } from "./src/routes/index.ts";
const app: Express = express();
app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

console.log("hey i am app do ts");
app.use("/app", routes);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(3333, () => {
  console.log("running server");
});
