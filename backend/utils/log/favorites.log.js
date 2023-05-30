const { createLogger, transport, format, transports } = require("winston");



const favoritesLogger = createLogger({
  transports: [
    new transports.File({
      filename: "favorites.info.log",
      level: "info",
      format: format.combine(format.timestamp(), format.json()),
    }),

    new transports.File({
      filename: "favorites.error.log",
      level: "error",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.File({
      filename: "favorites.debug.log",
      level: "debug",
      format: format.combine(format.timestamp(), format.json()),
    }),

    new transports.File({
      filename: "favorites.warn.log",
      level: "warn",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

module.exports = { favoritesLogger };
