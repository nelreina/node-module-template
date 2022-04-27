import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);

import logger from "../config/logger.js";

const basePath = "/api";

export default (app) => {
  logger.info(`=== public routes ===`);
  fs.readdirSync(__dirname)
    .filter(function (file) {
      return file.indexOf(".") !== 0 && file !== "index.js";
    })
    .forEach(async function (file) {
      const routePath = file.replace(".js", "");
      logger.info(`•   ${basePath}/${routePath}`);
      const module = await import(path.join(__dirname, file));

      app.use(`${basePath}/${routePath}`, module.default);
    });
  app.get(basePath, async (req, res) => {
    res.send({ message: `${basePath} routes` });
  });
};
