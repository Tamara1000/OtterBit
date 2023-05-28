const express = require("express");
const {
  getSongsByArtistName,
  getSongsByPartialArtistName
} = require("../controllers/songs.controller");
const router = express.Router();

router.get("/:artistName", getSongsByArtistName);
router.get("/partial/:artistName", getSongsByPartialArtistName);


module.exports = router;
