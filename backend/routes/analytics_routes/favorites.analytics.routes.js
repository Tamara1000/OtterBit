const express = require("express");
const {getTopSongs,} = require("../../controllers/analytics/favorites.analytics");
const analyticsRoutes = express.Router();
analyticsRoutes.get("/topSongs", getTopSongs);
module.exports = analyticsRoutes;







