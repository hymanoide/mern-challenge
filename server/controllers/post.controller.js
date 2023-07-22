const Post = require('../models/post');
const cuid = require('cuid');
const slug = require('limax');
const sanitizeHtml = require('sanitize-html');

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
getPosts = async (req, res) => {
    Post.find().sort('-dateAdded').exec((err, posts) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json({posts});
    });
};

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
addPost = async (req, res) => {
    if (!req.body.post.name || !req.body.post.title || !req.body.post.content) {
        res.status(403).end();
    }

    const newPost = new Post(req.body.post);

    // Let's sanitize inputs
    newPost.title = sanitizeHtml(newPost.title);
    newPost.name = sanitizeHtml(newPost.name);
    newPost.content = sanitizeHtml(newPost.content);

    newPost.slug = slug(newPost.title.toLowerCase(), {lowercase: true});
    newPost.cuid = cuid();
    newPost.save((err, saved) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json({post: saved});
    });
};

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
getPost = async (req, res) => {
    Post.findOne({cuid: req.params.cuid}).exec((err, post) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json({post});
    });
};

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */


deletePost = async (req, res) => {
    Post.findOne({cuid: req.params.cuid}).exec((err, post) => {
        if (err) {
            res.status(500).send(err);
        }

        // Security back-end control to avoid deletion of posts by not owners.
        if (req.body.user === post.name) {
            post.remove(() => {
                res.status(200).end();
            });
        } else {
            res.status(401).json({error: 'Only the owner of the post can delete it.'});
        }
    });
};


/**
 *
 * @param cuid
 * @param imageUrl
 * @param callback
 * @returns {Promise<*>}
 */
attachImagePost = async (cuid, imageUrl) => {
    if (!cuid || !imageUrl) {
        return Promise.reject("Need post cuid and imageUrl");
    }

    try {
        const post = await Post.findOne({cuid: cuid}).exec();

        if (!post) {
            return Promise.reject("Post not found");
        }

        post.image = imageUrl;
        await post.save();
        return "Image attached";
    } catch (error) {
        console.error('Error attaching image url:', error);
        return Promise.reject("An error occurred attaching image url");
    }
};

module.exports = {
    getPosts,
    addPost,
    getPost,
    deletePost,
    attachImagePost
};
