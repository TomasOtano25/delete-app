import "reflect-metadata";
import dotnev from "dotenv-safe";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { formatArgumentValidationError } from "type-graphql";
import { createConnection } from "typeorm";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";

// import { RegisterResolver } from "./modules/user/Register";
import { redis } from "./redis";
// import { LoginResolver } from "./modules/user/Login";
// import { MeResolver } from "./modules/user/Me";
// import { customAuthChecker } from "./utils/customAuthChecker";
import { createSchema } from "./utils/createSchema";
// import { ConfirmUserResolver } from "./modules/user/ConfirmUser";

dotnev.config();

const main = async () => {
  await createConnection();
  // RegisterResolver,
  // LoginResolver,
  // MeResolver,
  // ConfirmUserResolver
  const schema = await createSchema();

  // const schema = await buildSchema({
  //   resolvers: [__dirname + "/modules/**/*.ts"],
  //   authChecker: customAuthChecker
  // });

  const apolloServer = new ApolloServer({
    schema,
    formatError: formatArgumentValidationError,
    context: ({ req, res }: any) => ({ req, res })
  });

  const app = Express();

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

main();
