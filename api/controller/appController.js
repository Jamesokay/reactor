const Post = require("../models/Post");

const uploadPost = async (req, res) => {
  console.log('Request received on back end')
  try {
    if (req.file && req.file.path) {
      const newPost = new Post({
        userId: req.body.userId,
        img: req.file.path 
      })
      await newPost.save();
      return res.status(200).json({ msg: "post successfully uploaded" });
    } else {
      console.log(req.file);
      return res.status(422).json({ error: "invalid" });
    }

  } catch (error) {
    console.error(error);
   return res.status(500).json({ error: "some error occured" });
  }
};
module.exports = { uploadPost }