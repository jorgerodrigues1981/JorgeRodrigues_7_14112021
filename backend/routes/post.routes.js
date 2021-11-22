// Importation de modules
const express = require("express");
const router = express.Router();

// Importation du controller
const postCtrl = require("../controllers/post.controller");

// Importation des middlewares
const auth = require("../middlewares/auth"); 
const multer = require("../middlewares/multer-config");


// Routes
router.get("/", auth, postCtrl.getAllPosts);
router.get("/:id", auth, postCtrl.getOnePost);
router.post("/", auth, multer, postCtrl.createPost);
router.delete("/:id", auth, postCtrl.deletePost);
router.post("/:id/comment", auth, postCtrl.createComment);
router.post("/:id/reaction", auth, postCtrl.reactPost);

module.exports = router;
