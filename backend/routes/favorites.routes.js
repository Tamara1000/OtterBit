const express = require("express");
const {
  addSongToFavorites,
  deleteSongFromFavorites,
  getFavoritesById,
} = require("../controllers/favorites.controller");

const { isPremium } = require("../middlewares/users.middleware");
const { auth } = require("../middlewares/auth");


const router = express.Router();

router.post("/addSong", auth ,isPremium, addSongToFavorites);
router.delete("/:user_id/delete/:song_id", deleteSongFromFavorites);
router.get("/:user_id", getFavoritesById);

module.exports = router;
