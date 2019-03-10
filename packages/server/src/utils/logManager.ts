import pino from "pino";

export const logManager = () => {
  const loggingIntance = pino(
    {
      prettyPrint: { colorize: true }
    },
    process.stdout
  );

  // write first log entry...
  const lNow = new Date().toLocaleString();
  loggingIntance.info(`Logging initialized at ${lNow}`);

  return loggingIntance;
};
