const { createLogger, transport, format, transports } = require("winston");

//-------logging function

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
  ],
});

module.exports = { usersLogger };
