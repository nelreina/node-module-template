import { transports, createLogger, format } from "winston";

export const loggerOptions = {
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  defaultMeta: { service: "node-template" },
  transports: [
    new transports.Console(),
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "node-template.log" }),
  ],
};

export default createLogger(loggerOptions);
