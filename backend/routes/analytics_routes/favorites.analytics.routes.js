const express = require("express");

const {
  getTopFavorableSongs,
} = require("../../controllers/analytics/favorites.analytics");

const analyticsRoutes = express.Router();

analyticsRoutes.get("/topFavorableSongs", getTopFavorableSongs);

module.exports = analyticsRoutes;







