import path from "path";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import { sendSecretMail } from "./utils";

require("dotenv").config({ path: path.resolve(__dirname, ".env") });

//sendSecretMail("sondeokhyeon@gmail.com", "123");

const PORT = process.env.PORT;

const server = new GraphQLServer({ schema });

server.express.use(logger("dev"));
server.start(
  {
    port: PORT
  },
  () => console.log(`Server Running on port http://localhost:${PORT}`)
);
