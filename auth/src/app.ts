import express from "express";
import "express-async-errors";
import { json } from 'body-parser';
import cookieSession from "cookie-session";

import { currentuserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middleware/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();

// To trust requests comming from Nginx proxy
app.set("trust proxy", true);

app.use(json());

app.use(cookieSession({
  signed: false,
  secure: true,
}))

app.use(currentuserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", async () => {
  throw new NotFoundError();
})

app.use(errorHandler);

export default app;