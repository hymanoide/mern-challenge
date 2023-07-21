const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post.controller');
const passport = require("../middlewares/passport");

// Get all Posts
router.route('/posts').get(PostController.getPosts);

// Get one post by cuid
router.route('/posts/:cuid').get(PostController.getPost);


// Protected - Add a new Post
router.route('/posts').post(passport.authenticate('jwt', {session: false}), PostController.addPost);

// No-protected - Add a new Post
// router.route('/posts').post(PostController.addPost);

// Protected - Delete a post by cuid
router.route('/posts/:cuid').delete(passport.authenticate('jwt', {session: false}), PostController.deletePost);

// No-protected - Delete a post by cuid
// router.route('/posts/:cuid').delete(PostController.deletePost);

module.exports = router;
