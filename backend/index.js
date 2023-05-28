const { app } = require("./app");


const { connectToDB } = require("./db");

 connectToDB();
const PORT = process.env.PORT || 1200;
app.listen(PORT, () => {
  console.log(`The server in running on ${PORT}`);
});
