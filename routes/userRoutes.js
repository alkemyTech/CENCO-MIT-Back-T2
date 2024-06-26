const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Ruta para crear un nuevo usuario
router.post("/users", userController.createUser);

module.exports = router;
