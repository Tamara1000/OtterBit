const express = require("express");
const cors = require("cors");
const redis = require("redis");
const { redisClient } = require("./utils/cache");
// const userRouter = require('./routes/user.routes')
const { routes } = require("./routes");
const { analyticsRoutes } = require("./routes/analytics_routes");
const app = express();
app.use(express.json());

//app.use("/api/v1/artists", routes.artists);
app.use("/api/v1/favorites", routes.favorites);
app.use("/api/v1/songs", routes.songs);
app.use("/api/v1/users", routes.users);


app.use("/api/v1/artists/analytics", analyticsRoutes.artists);
app.use("/api/v1/favorites/analytics", analyticsRoutes.favorites);
app.use("/api/v1/songs/analytics", analyticsRoutes.songs);
//app.use("/api/v1/users/analytics", analyticsRoutes.users);




redisClient.connect().then(() => {
  console.log("redis is up");
});

app.use(express.json());



module.exports = { app };
