// Generated project node-template
import "dotenv/config";
import minimist from "minimist";
import OS from "os";
import RedisStreamConsumer from "@nelreina/redis-stream-consumer";

import { client } from "./config/redis-client.js";
import logger from "./config/logger.js";
import server from "./config/server.js";

const EVENTS = process.env["EVENTS"];
console.log("LOG:  ~ file: index.js ~ line 12 ~ EVENTS", EVENTS);
const STREAM = process.env["STREAM"];
const CONSUMER_GROUP = process.env["CONSUMER_GROUP"];
const PORT = process.env["PORT"] || 5555;

const CONSUMER_NAME = OS.hostname();
const argv = minimist(process.argv.slice(2));

const DEBUG = process.env["DEBUG"];

logger.info(`Start Project: ${JSON.stringify({ DEBUG, argv })}  `);

const sleep = (seconds = 2000) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, seconds);
  });

try {
  if (client.isOpen) {
    logger.info("STREAM: " + STREAM);
    logger.info("CONSUMER_GROUP: " + CONSUMER_GROUP);
    logger.info("CONSUMER_NAME: " + CONSUMER_NAME);
    logger.info("Successfully connected to redis");
    const stream = await RedisStreamConsumer(client, STREAM, CONSUMER_GROUP, {
      logger,
    });

    const streamCallback = async (msg) => {
      // await sleep();
      if (EVENTS.includes(msg.message.event)) logger.info(JSON.stringify(msg));
    };

    if (stream.listen) {
      stream.listen(streamCallback);
    }

    await server.listen(PORT);
    logger.info(`Server is up on port: ${PORT}`);

    const shutdown = async () => {
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

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } else {
    logger.error("Could not connect to Redis client!");
  }
} catch (error) {
  logger.error(error.message);
}
