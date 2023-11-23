const express = require("express");
const router = express.Router();
const jwtAuth = require("../configs/jwtAuth");

router.post("/", jwtAuth.verifyToken, groip)