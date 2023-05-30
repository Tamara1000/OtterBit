const { pool } = require("./../../db");
//const { favoritesLogger } = require("../utils/log/favorites.log");

const getTopFavorableSongs = async (req, res) => {
  const { limit = 3 } = req.query;
  console.log({ limit });
  try {
    const result = await pool.query(
      `
      SELECT s.song_title, COUNT(f.song_id) AS favorability
      FROM songs s
      LEFT JOIN favorites f ON s.song_id = f.song_id
      GROUP BY s.song_id
      ORDER BY favorability DESC
      LIMIT $1;
      `,
      [Number(limit)]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching top songs:", error);
   return res.sendStatus(500);
  }
};

module.exports = {
  getTopFavorableSongs,
};
