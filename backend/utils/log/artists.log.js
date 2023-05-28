const { createLogger, transport, format, transports } = require("winston");

//-------logging function

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
  ],
});

module.exports = { artistsLogger };
