import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();
import connect from "../db";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import schema from "../graphql/schema";
import bodyParser from "body-parser";

const app = express();

app.set(`port`, process.env.PORT);
app.use(morgan(`dev`));
connect();

if (process.env.NODE_ENV === `production`) {
  app.use(
    "/graphql",
    cors(),
    bodyParser.json(),
    graphqlHTTP({
      schema,
      graphiql: false,
    })
  );
} else {
  app.use(
    "/graphql",
    cors(),
    bodyParser.json(),
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );
}

app.listen(app.get(`port`), () => {
  console.log(
    ` - 🍀 [UNOWATCH] GRAPHQL BACKEND SERVER START WITH MONGODB  PORT : ${process.env.PORT} 🍀 `
  );
});
