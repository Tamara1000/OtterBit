const { pool } = require("./../../db");
const { artistsLogger } = require("../../utils/log/artists.log");

const getTopArtists = async (req, res) => {
  try {
    const { limit = 3 } = req.query;
    const result = await pool.query(
      `
      SELECT
  artists.artist_id,
  artists.artist_name,
  COUNT(*) AS total_favorites
FROM
  artists
JOIN
  songs ON artists.artist_id = songs.artist_id
JOIN
  favorites ON songs.song_id = favorites.song_id
GROUP BY
  artists.artist_id,
  artists.artist_name
ORDER BY
  total_favorites DESC
    LIMIT  $1;
      `,
      [limit]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching top artists:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getTopArtists,
};
