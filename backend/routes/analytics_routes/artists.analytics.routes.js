const express = require("express");

const { getTopArtists } = require("../../controllers/analytics/artists.analytics");

const analyticsRoutes = express.Router();

analyticsRoutes.get("/topArtists", getTopArtists);

module.exports = analyticsRoutes;

