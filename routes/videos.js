const express = require("express");
const router = express.Router();
const fs = require("fs");

const videosFilePath = "./data/videos.json";

//get all videos from json file
const getVideos = () => {
  return JSON.parse(fs.readFileSync(videosFilePath));
};

//get all videos and send them to the video route
router.route("/videos").get((_req, res) => {
  let videos = getVideos();

  res.send(videos);
});

//get selected video and send to the selected route
router.route("/videos/:id").get((req, res) => {
  const requestedId = req.params.id;
  let videos = getVideos();
  const foundVideo = videos.find((video) => video.id === requestedId);

  if (!foundVideo) {
    return res.status(404).send("Video with id " + requestedId + " not found.");
  }

  return res.send(foundVideo);
});

module.exports = router;
