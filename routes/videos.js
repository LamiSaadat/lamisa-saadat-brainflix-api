const express = require("express");
const router = express.Router();
const fs = require("fs");

const videosFilePath = "./data/videos.json";

const getVideos = () => {
  return JSON.parse(fs.readFileSync(videosFilePath));
};

router.route("/videos").get((req, res) => {
  let videos = getVideos();

  res.send(videos);
});

router.route("/videos/:id").get((req, res) => {
  let videos = getVideos();

  res.send(videos.id);
});

module.exports = router;
