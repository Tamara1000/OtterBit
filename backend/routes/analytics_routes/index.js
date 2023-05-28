const analyticsRoutes = {
  artists: require("./artists.analytics.routes"),
  favorites: require("./favorites.analytics.routes"),
  songs: require("./songs.analytics.routes"),
  users: require("./users.analytics.routes"),
};

module.exports = { analyticsRoutes };
