const express = require("express");
const {
  getTopSongsByDecade,
  getTopLongestAndShortestSongs,
} = require("../../controllers/analytics/songs.analytics");
const analyticsRoutes = express.Router();

analyticsRoutes.get("/topSongsByDecade", getTopSongsByDecade);
analyticsRoutes.get(
  "/topLongestAndShortestSongs",
  getTopLongestAndShortestSongs
);

module.exports = analyticsRoutes;
