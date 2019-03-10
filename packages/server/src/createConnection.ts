import { getConnectionOptions, createConnection } from "typeorm";
import { logger } from "./index";

export const createTypeormConnection = async () => {
  let retries = 5;
  while (retries) {
    try {
      const config = await getConnectionOptions(process.env.NODE_ENV);

      const secureConfig = {
        ...config,
        name: "default",
        username: "postgres",
        password: "1212"
      };

      return createConnection(secureConfig);
    } catch (error) {
      logger.error(error);
      retries -= 1;
      logger.info(`Retries left: ${retries}`);

      // wait 5 seconds
      await new Promise(response => setTimeout(response, 5000));
    }
  }

  return null;
};
