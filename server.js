const express = require("express");
const app = express();
const PORT = 8080;
const videosRoutes = require("./routes/videos");
const cors = require("cors");
app.use(cors());

app.use(express.static("./public/images"));

//default route
app.use("/", videosRoutes);
//individual video route
app.use("/:id", videosRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
