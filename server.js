const express = require("express");
const app = express();
const PORT = 8080;
const videosRoutes = require("./routes/videos");
const cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  res.send("I working");
});

app.use("/", videosRoutes);
app.use("/:id", videosRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
