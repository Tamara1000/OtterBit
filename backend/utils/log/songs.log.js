const { createLogger, transport, format, transports } = require("winston");



const songsLogger = createLogger({
  transports: [
    new transports.File({
      filename: "songs.info.log",
      level: "info",
      format: format.combine(format.timestamp(), format.json()),
    }),

    new transports.File({
      filename: "songs.error.log",
      level: "error",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.File({
      filename: "songs.debug.log",
      level: "debug",
      format: format.combine(format.timestamp(), format.json()),
    }),

    new transports.File({
      filename: "songs.warn.log",
      level: "warn",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

module.exports = { songsLogger };
