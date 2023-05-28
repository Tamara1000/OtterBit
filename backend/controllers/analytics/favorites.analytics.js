const { pool } = require("./../../db");
//const { favoritesLogger } = require("../utils/log/favorites.log");

const getTopSongs = async (req, res) => {
  try {
    
    const result = await pool.query(`
      SELECT s.song_title, COUNT(f.song_id) AS favorability
      FROM songs s
      LEFT JOIN favorites f ON s.song_id = f.song_id
      GROUP BY s.song_id
      ORDER BY favorability DESC
      LIMIT 3;
    `);
    res.json(result.rows);

  } catch (error) {
    console.error("Error fetching top songs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getTopSongs,
};
