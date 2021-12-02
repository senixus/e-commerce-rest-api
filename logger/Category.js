const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({
      filename: "logger/category/error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "logger/category/info.log",
      level: "info",
    }),
    new winston.transports.File({ filename: "logger/category/combined.log" }),

    // For Console
    //  new winston.transports.Console()
  ],
});

module.exports = logger;
