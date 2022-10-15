// setting up imports
import express from "express";
import config from "config";
import log from "./logger";
import connect from "./db/connect";
import routes from "./routes/routes";




// setting up port and host variables
const port = config.get("port") as number;
const host = config.get("host") as string;


// setup express app
const app = express();

// newest version of express can parse json therefore no need to import the jsonparser
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/", (req, res) => {
  console.log(req.body.name);
  res.send(
    "hello fucking world! I have send a post request to the fucking backend server"
  );
});

app.get("/", (req, res) => {
  console.log("hello world");
  res.send("hello world from the server!");
});

app.listen(port, host, () => {
   log.info(`server listening to : http://${host}:${port}`);
   // connect to database
   connect();

   // add in the routes
   routes(app);
});
