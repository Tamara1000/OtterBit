const { pool } = require("../db");
const { redisClient } = require("../utils/cache");
const { favoritesLogger } = require("../utils/log/favorites.log");

const addSongToFavorites = async (req, res) => {
  const { user_id, song_id } = req.body;
  console.log(user_id);
  console.log(song_id);

  try {
    const songResult = await pool.query(
      "SELECT * FROM songs WHERE song_id = $1",
      [song_id]
    );

    if (songResult.rows.length === 0) {
      pool.end();
      return res.sendStatus(404);
    }
    if (res.locals.isPremium == false) {
      const favoritesNum = await pool.query(
        "SELECT COUNT(*) as num_favorites FROM favorites WHERE user_id = $1",
        [user_id]
      );
      if (favoritesNum.rows[0].num_favorites >= 5) {
        return res.sendStatus(404);
      } else if (
        res.locals.isPremium ||
        (res.locals.isPremium == false &&
          favoritesNum.rows[0].num_favorites < 20)
      ) {
        const favoritesResult = await pool.query(
          "SELECT * FROM favorites WHERE user_id = $1 AND song_id = $2",
          [user_id, song_id]
        );
        if (favoritesResult.rows.length === 0) {

          await pool.query(
            "INSERT INTO favorites (user_id, song_id) VALUES ($1, $2)",
            [user_id, song_id]
          );
          pool.end();
          return res.send(`Song  ${song_id} added to  favorites of ${user_id}`);
        } else {
          pool.end();
          return res.send(
            `Song ${song_id} is already in favorites of ${user_id}`
          );
        }
      }
    }
  } catch (err) {
    console.error(err);
     favoritesLogger.error("blablabla");
    res.status(500).send("Internal server error");
  }
};

const deleteSongFromFavorites = async (req, res) => {
  const user_id = req.params.user_id;
  const song_id = req.params.song_id;
  console.log(user_id);
  console.log(song_id);

  try {
    const client = await pool.connect();

    
    const userResult = await client.query(
      "SELECT * FROM users WHERE user_id = $1",
      [user_id]
    );

   
    const songResult = await client.query(
      "SELECT * FROM songs WHERE song_id = $1",
      [song_id]
    );

    if (userResult.rows.length === 0 || songResult.rows.length === 0) {
      client.release();
      return res.status(404).send("User or song not found");
    }

  
    const favoritesResult = await client.query(
      "SELECT * FROM favorites WHERE user_id = $1 AND song_id = $2",
      [user_id, song_id]
    );

    if (favoritesResult.rows.length === 0) {
      return res.send(
        `Song  ${song_id} is not found in  favorites of ${user_id}`
      );
    }

  
    await client.query(
      "DELETE FROM favorites WHERE user_id = $1 AND song_id = $2",
      [user_id, song_id]
    );
    client.release();
    return res.send(`Song ${song_id} removed from favorites of ${user_id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

const getFavoritesById = async (req, res) => {
  const { user_id } = req.params;
  console.log(user_id);
  try {

    const cachedSongs = await redisClient.get(user_id);
    console.log(cachedSongs);
    console.log(cachedSongs);
    if (cachedSongs) {
      console.log("Retrieving favorite songs from Redis cache");
      const favoriteSongs = JSON.parse(cachedSongs);
      return res.json(favoriteSongs);
    }

    try {
      
      const userResult = await pool.query(
        "SELECT * FROM users WHERE user_id = $1",
        [user_id]
      );

      if (userResult.rows.length === 0) {
        return res.sendStatus(404);
      }

    
      const favoritesResult = await pool.query(
        `
          SELECT songs.song_id, songs.song_title, songs.song_duration, songs.song_releaseYear
          FROM songs
          INNER JOIN favorites ON songs.song_id = favorites.song_id
          WHERE favorites.user_id = $1
        `,
        [user_id]
      );

      const favoriteSongs = favoritesResult.rows;

      await redisClient.set(user_id, JSON.stringify(favoriteSongs));

      console.log("Successfully got list of favorites");
      res.json(favoriteSongs);
    } finally {
      client.release();
    }
  } catch (err) {
    favoritesLogger.error("Error finding favorites");
    console.error(err);
    return res.sendStatus(500);
  }
};

module.exports = {
  addSongToFavorites,
  deleteSongFromFavorites,
  getFavoritesById,
};
