// Importation de modules
const express = require("express");
const router = express.Router();

// Importation du controller
const userCtrl = require("../controllers/user.controller");

// Importation des middlewares
const auth = require("../middlewares/auth"); 
const multer = require("../middlewares/multer-config"); 


// Routes
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.delete("/delete", auth, userCtrl.delete);
router.get("/:id/profile", auth, userCtrl.profile);
router.get("/role", auth, userCtrl.role);
router.put("/modify", auth, multer, userCtrl.modify);

module.exports = router;

