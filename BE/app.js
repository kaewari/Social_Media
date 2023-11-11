const express = require("express");
require("dotenv").config({
  path: ".env",
});
require("./databases/initMongodb");
require("./configs/redis");
const cors = require("cors");
const file = require("fs");
const user_router = require("./router/user_router");
const post_router = require("./router/post_router");
const auth_router = require("./router/access/auth_router");
const mock_router = require("./router/mock_router");
const index_router = require("./router/index_router");
const friend_router = require("./router/friend_router");
const morgan = require("morgan");
const { default: helmet } = require("helmet");
const compression = require("compression");
const app = express();
app.use(express.json());
app.use(cors());
//init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
//init route /
app.use("", index_router);
app.use("/v1/api/auth/", auth_router);
app.use("/v1/api/posts/", post_router);
app.use("/v1/api/users/", user_router);
app.use("/v1/api/mock/", mock_router);
app.use("/v1/api/friends/", friend_router);
app.use((req, res, next) => {
  return res.status(404).json({ message: "Not Found" });
});
module.exports = app;
