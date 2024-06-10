const express = require("express");
const postControllers = require("../controllers/post");

const router = express.Router();

router.get("/api/v1/postList",postControllers.postList);    // Retrives all posts.

router.post("/api/v1/createPost",postControllers.createPost);   //Creates new post.

router.get("/api/v1/post/:id",postControllers.getPostById);    // Retrives post by id.

router.put("/api/v1/post/:id",postControllers.updatePostById);    // Update existing post.

router.delete("/api/v1/post/:id",postControllers.deletePostById);    // Delete existing post.

router.post("/api/v1/comments/:postId",postControllers.addComments);    // Add comment in post.

router.put("/api/v1/comments/:postId",postControllers.updateComments);    // Update comment in post.

router.delete("/api/v1/comments/:postId",postControllers.deleteComments);    // Delete comment from post.

module.exports = router;