import { Connection } from "typeorm";
import redisClient from "ioredis";
import pino from "pino";
import { Server } from "net";

export interface ShutdownOptions {
  db: Connection;
  redisClient: redisClient.Redis;
  logger: pino.Logger;
  nodeServer: Server;
}

export const setupErrorHandling = (config: ShutdownOptions) => {
  process.on("uncaughtException", error => {
    config.logger.error(error, "Uncaught Exception");
    shutdown(config);
  });

  process.on("unhandledRejection", (_, error) => {
    config.logger.error(error, "Uncaught Rejection");
    shutdown(config);
  });

  process.on("SIGINT", async () => {
    config.logger.warn("Node process terminated via SIGINT...");
    shutdown(config);
  });
};

const shutdown = async (config: ShutdownOptions) => {
  config.logger.warn("Shutting down HTTP server.");
  config.nodeServer.close(() => {
    config.logger.warn("HTTP server closed.");
    config.redisClient.disconnect();
    config.logger.warn("Redis disconnected.");

    config.db.close().then(() => {
      config.logger.warn("Database disconnected.");
      const finalLogger = pino.final(config.logger);
      finalLogger.warn("Bye.");
      process.exit(1);
    });
  });
};
