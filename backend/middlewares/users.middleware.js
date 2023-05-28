const { pool } = require("../db");

const isPremium = async (req, res, next) => {
  const user_id = req.body.user_id;
  const song_id = req.body.song_id;
  try {
    console.log(req.body);

    const client = await pool.connect();

  
    const userResult = await client.query(
      "SELECT * FROM users WHERE user_id = $1",
      [user_id]
    );
    console.log("userResult:");
    console.log(userResult);


    const songResult = await client.query(
      "SELECT * FROM songs WHERE song_id = $1",
      [song_id]
    );

    if (userResult.rows.length === 0 || songResult.rows.length === 0) {
      client.release();
      return res.status(404).send("User or song not found");
    } else if (userResult.rows[0].is_premium == true) {
      next();
    } else {
      const favoritesNum = await client.query(
        "SELECT COUNT(*) as num_favorites FROM favorites WHERE user_id = $1",
        [user_id]
      );
      if (favoritesNum.rows[0].num_favorites < 20) {
        console.log("favoriteNum1");
        console.log(favoritesNum.rows[0].num_favorites);
        next();
      } else {
        console.log("favoriteNum2");
        console.log(favoritesNum.rows[0].num_favorites);
        client.release();
        return res
          .status(404)
          .send(
            "Opps, you are nor a premium member so you can have on your list maximum 20 songs"
          );
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }

  //next();
};

module.exports = {
  isPremium,
};
