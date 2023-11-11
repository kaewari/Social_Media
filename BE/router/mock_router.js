const express = require("express");
const router = express.Router();
const mock_controller = require("../controllers/create_mock_data_controller");
router.get("/", mock_controller.create_mock_phone_number);
router.post("/", mock_controller.create_multiple_users);
module.exports = router;
