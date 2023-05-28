const { pool } = require("../db");

//1.a
// Request an artist name as a parameter
// Response the songs of this specific artist
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

//1.b
// Request an artist partial name as a parameter
// Response the songs of this specific artist
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
    res.status(500).send("Internal server error");
  }
};

module.exports = { getSongsByArtistName, getSongsByPartialArtistName };
