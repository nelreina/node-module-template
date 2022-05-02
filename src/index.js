// Generated project node-template
import "dotenv/config";
import minimist from "minimist";
import Stream from "@nelreina/redis-stream-consumer";

import { client } from "./config/redis-client.js";
import logger from "./config/logger.js";
import server from "./config/server.js";

import OS from "os";
const STREAM = process.env["STREAM"];
const CONSUMER_GROUP = process.env["CONSUMER_GROUP"];
const PORT = process.env["PORT"] || 5555;
const CONSUMER_NAME = OS.hostname();
const argv = minimist(process.argv.slice(2));

const DEBUG = process.env["DEBUG"];

logger.info(`Start Project: ${JSON.stringify({ DEBUG, argv })}  `);

try {
  if (client.isOpen) {
    logger.info("STREAM: " + STREAM);
    logger.info("CONSUMER_GROUP: " + CONSUMER_GROUP);
    logger.info("CONSUMER_NAME: " + CONSUMER_NAME);
    logger.info("Successfully connected to redis");
    const stream = await Stream(client, STREAM, CONSUMER_GROUP, {}, logger);

    const streamCallback = (msg) => logger.info(JSON.stringify(msg));

    if (stream.listen) {
      stream.listen(streamCallback);
    }

    await server.listen(PORT);
    logger.info(`Server is up on port: ${PORT}`);
  }
} catch (error) {
  logger.error(error.message);
}
