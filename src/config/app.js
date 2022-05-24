import logger from "./logger.js";

export const shutdown = (client) => async () => {
  try {
    logger.info("Disconnecting from redis...");
    await client.disconnect();
    logger.info("Shutdown HTTP server ...");
    // await server.close();
    process.exit(0);
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};
