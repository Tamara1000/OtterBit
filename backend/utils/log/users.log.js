const { createLogger, transport, format, transports } = require("winston");



const usersLogger = createLogger({
  transports: [
    new transports.File({
      filename: "users.info.log",
      level: "info",
      format: format.combine(format.timestamp(), format.json()),
    }),

    new transports.File({
      filename: "users.error.log",
      level: "error",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.File({
      filename: "users.debug.log",
      level: "debug",
      format: format.combine(format.timestamp(), format.json()),
    }),

    new transports.File({
      filename: "users.warn.log",
      level: "warn",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

module.exports = { usersLogger };
