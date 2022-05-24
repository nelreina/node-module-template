// Generated project node-template
import "dotenv/config";
import minimist from "minimist";
import OS from "os";
import RedisStreamConsumer from "@nelreina/redis-stream-consumer";

import { client } from "./config/redis-client.js";
import logger from "./config/logger.js";
import server from "./config/server.js";
import { SERVICE } from "./config/constants.js";
import { shutdown } from "./config/app.js";

const EVENTS = process.env["EVENTS"];
console.log("LOG:  ~ file: index.js ~ line 12 ~ EVENTS", EVENTS);
const STREAM = process.env["STREAM"];
const PORT = process.env["PORT"] || 5555;

const CONSUMER_NAME = OS.hostname();
const argv = minimist(process.argv.slice(2));

const DEBUG = process.env["DEBUG"];

logger.info(`Start Project: ${JSON.stringify({ DEBUG, argv })}  `);

try {
  if (client.isOpen) {
    logger.info("STREAM: " + STREAM);
    logger.info("SERVICE_NAME: " + SERVICE);
    logger.info("CONSUMER_NAME: " + CONSUMER_NAME);
    logger.info("Successfully connected to redis");
    const stream = await RedisStreamConsumer(client, STREAM, SERVICE, {
      logger,
    });

    const streamCallback = async (msg) => {
      if (EVENTS.includes(msg.message.event)) logger.info(JSON.stringify(msg));
    };

    if (stream.listen) {
      stream.listen(streamCallback);
    }

    await server.listen(PORT);
    logger.info(`Server is up on port: ${PORT}`);

    process.on("SIGINT", shutdown(client));
    process.on("SIGTERM", shutdown(client));
  } else {
    logger.error("Could not connect to Redis client!");
  }
} catch (error) {
  logger.error(error.message);
}
