const express = require("express");
const { getTopArtists } = require("../../controllers/analytics/artists.analytics");
const router = express.Router();
router.get("/topArtists", getTopArtists);
module.exports = router;

