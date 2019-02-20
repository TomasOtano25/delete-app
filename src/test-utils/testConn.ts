import { createConnection } from "typeorm";

export const testConn = (drop: boolean = false) =>
  createConnection({
    name: "default",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1212",
    database: "movies_app_default_test",
    synchronize: drop,
    dropSchema: drop,
    entities: [__dirname + "/../entity/*.*"]
  });
