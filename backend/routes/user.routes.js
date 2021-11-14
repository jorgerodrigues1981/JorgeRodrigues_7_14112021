const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user.controller");

// Importation middlewares
const auth = require("../middlewares/auth"); 
const multer = require("../middlewares/multer-config"); 



////////////////////
router.get("/allusers", userCtrl.getAllUsers);
/*router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.delete("/delete", auth, userCtrl.delete);
router.get("/:id/profile", auth, userCtrl.profile);
router.get("/role", userCtrl.role);
router.put("/modify", auth, multer, userCtrl.modify);
*/
module.exports = router;
