const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const upload = require("../services/upload")
const { uploadPost } = require("../controller/appController")
const cloudinary = require('cloudinary').v2
const dotenv = require('dotenv')

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_HOST,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  })


// upload
router.post('/upload', upload.single('img'), uploadPost)


//update a post

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("post updated");
    } else {
      res.status(403).json("you can only update your own posts");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a post

router.delete("/delete", async (req, res) => {
  console.log('received')
  console.log(req.body)
  try {
    const post = await Post.findById(req.body.postId);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      await cloudinary.uploader.destroy(`user-images/${req.body.cloudinaryId}`, function(error,result) {
        console.log(result, error) })
      res.status(200).json("the post has been deleted");
    } else {
      res.status(403).json("you can only delete your own posts");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//like or unlike a post

router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("post liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("post unliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a post

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get feed posts

router.get("/feed/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.json(userPosts.concat(...friendPosts))
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all posts of a given user

router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;