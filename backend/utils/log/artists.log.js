const { createLogger, transport, format, transports } = require("winston");


const artistsLogger = createLogger({
  transports: [
    new transports.File({
      filename: "artists.info.log",
      level: "info",
      format: format.combine(format.timestamp(), format.json()),
    }),

    new transports.File({
      filename: "artists.error.log",
      level: "error",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.File({
      filename: "artists.debug.log",
      level: "debug",
      format: format.combine(format.timestamp(), format.json()),
    }),

    new transports.File({
      filename: "artists.warn.log",
      level: "warn",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

module.exports = { artistsLogger };
