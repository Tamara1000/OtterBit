const { pool } = require("./../../db");
//const { favoritesLogger } = require("../utils/log/favorites.log");

const getTopSongsByDecade = async (req, res) => {
  try {
    const { limit = 3 } = req.query;
    const result = await pool.query(
      `
        SELECT *
          FROM (
            SELECT 
              s.song_title,
              s.song_releaseYear,
              COUNT(f.song_id) AS favorability_rank,
              ROW_NUMBER() OVER (PARTITION BY s.song_releaseYear ORDER BY COUNT(f.song_id) DESC) AS row_num
            FROM
              SONGS s
              INNER JOIN favorites f ON s.song_id = f.song_id
            WHERE
              s.song_releaseYear >= 1990
              AND s.song_releaseYear < 2030
            GROUP BY
              s.song_title,
              s.song_releaseYear
          ) AS subquery
          WHERE
            row_num <= $1
          ORDER BY
            song_releaseYear, favorability_rank DESC;
    `,
      [limit]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching top songs by decade:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getTopLongestAndShortestSongs = async (req, res) => {
  try {
    const { limit = 3 } = req.query;
    const longestQuery = await pool.query(
      `
      SELECT song_title, song_duration
      FROM songs
      ORDER BY song_duration DESC
      LIMIT $1;
      `,
      [limit]
    );
    const shortestQuery = await pool.query(
      `
      SELECT song_title, song_duration
      FROM songs
      ORDER BY song_duration ASC
      LIMIT  $1;
      `,
      [limit]
    );
    res.json({
      longestSongs: longestQuery.rows,
      shortestSongs: shortestQuery.rows,
    });
  } catch (error) {
    console.error("Error fetching top longest and shortest songs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getTopSongsByDecade,
  getTopLongestAndShortestSongs,
};
