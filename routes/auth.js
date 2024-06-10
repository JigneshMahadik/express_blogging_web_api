const express = require("express");
const controllers = require("../controllers/auth");

const router = express.Router();

router.post("/api/v1/signup",controllers.signUp);

router.post("/api/v1/login",controllers.login);

module.exports = router;