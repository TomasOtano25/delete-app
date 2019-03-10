import dotnev from "dotenv-safe";
dotnev.config();

import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
//import { formatArgumentValidationError } from "type-graphql";
import { createTypeormConnection } from "./createConnection";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import { redis } from "./redis";
import { createSchema } from "./utils/createSchema";
import { logManager } from "./utils/logManager";

// import { RegisterResolver } from "./modules/user/Register";

// import { LoginResolver } from "./modules/user/Login";
// import { MeResolver } from "./modules/user/Me";
// import { customAuthChecker } from "./utils/customAuthChecker";

// import { ConfirmUserResolver } from "./modules/user/ConfirmUser";

export const logger = logManager();
logger.info("Loading environment...");

const startServer = async () => {
  logger.info("Connecting database...");
  const connection = await createTypeormConnection();
  if (connection) {
    logger.info("Database connected.");
  }

  logger.info("Creating express server...");
  const app = Express();

  logger.info("Creating gql server...");
  const schema = await createSchema();
  const apolloServer = new ApolloServer({
    schema,
    /*formatError: formatArgumentValidationError,*/
    context: ({ req, res }: any) => ({ req, res })
  });

  const RedisStore = connectRedis(session);

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000"
      // origin: "*"
    })
  );

  app.use(
    session({
      store: new RedisStore({
        client: redis as any
      }),
      name: "qid",
      secret: "secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
      }
    })
  );

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log(`Server started on http://localhost:4000/graphql`);
  });
};

startServer();
