// express on port 3000 to listen for requests
const express = require("express");
const app = express();

app.use(express.json());

const routes = require("./routes");
app.use("/", routes);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
