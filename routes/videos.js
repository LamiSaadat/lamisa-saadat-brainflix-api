const express = require("express");
const router = express.Router();
const fs = require("fs");
const bodyParser = require("body-parser");
const { networkInterfaces } = require("os");
const { v4: uuid } = require("uuid");
const { channel } = require("diagnostics_channel");

const videosFilePath = "./data/videos.json";

router.use(bodyParser.json());

//read from file to get existing array of videos from json file
const getVideos = () => {
  return JSON.parse(fs.readFileSync(videosFilePath));
};

//get all videos and send them to the video route
router
  .route("/videos")
  .get((_req, res) => {
    let videos = getVideos();

    let videoData = videos.map((video) => {
      return {
        id: video.id,
        title: video.title,
        channel: video.channel,
        image: video.image,
      };
    });

    res.send(videoData);
  })
  .post((req, res) => {
    // res.send("Posting videos");
    let videos = getVideos();

    //create new video object and get data from user input
    let newVideo = {
      title: req.body.title,
      channel: "channel",
      image: "http://localhost:8080/Upload-video-preview.jpg",
      description: req.body.description,
      views: "0",
      likes: "0",
      duration: "0:00",
      timestamp: new Date(),
      comments: [],
      id: uuid(),
    };

    //push new object to existing array of videos
    videos.push(newVideo);

    //stringify array and write back to file
    fs.writeFileSync(videosFilePath, JSON.stringify(videos));

    return res.send(newVideo);
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
