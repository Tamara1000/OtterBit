const { pool } = require("../db");

const getSongsByArtistName = async (req, res) => {
  const artistName = req.params.artistName?.toLowerCase();
  console.log(artistName);
  try {
    const result = await pool.query(
      `
        SELECT song_id, song_title, song_duration, song_releaseYear 
        FROM songs 
        INNER JOIN artists ON songs.artist_id = artists.artist_id 
        WHERE lower(artist_name) LIKE $1
        `,
      [artistName]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving song data");
  }
};

const getSongsByPartialArtistName = async (req, res) => {
  const artistName = req.params.artistName?.toLowerCase();
  console.log(artistName);
  try {
    const result = await pool.query(
      `
      SELECT song_id, song_title, song_duration, song_releaseYear 
      FROM songs
      INNER JOIN artists ON songs.artist_id = artists.artist_id
      WHERE lower(artist_name) LIKE $1
    `,
      [`%${artistName}%`]
    );
    const songs = result.rows;
    res.json(songs);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};

module.exports = { getSongsByArtistName, getSongsByPartialArtistName };
