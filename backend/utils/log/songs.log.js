const { createLogger, transport, format, transports } = require("winston");

//-------logging function

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
  ],
});

module.exports = { songsLogger };
