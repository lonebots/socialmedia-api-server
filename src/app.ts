import express from "express";
import config from "config";
import log from "./logger";
import connect from "./db/connect";
import routes from "./routes/routes";
import { deserializeUser } from "./middleware";

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();
app.use(deserializeUser); // this will attach a user to every single request that comes into the application.

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, host, () => {
  log.info(`Server listing at http://${host}:${port}`);

  connect();

  routes(app);
});
