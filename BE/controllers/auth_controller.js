const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwtAuth = require("../configs/jwtAuth");
const properties = process.env;
const redisClient = require("../configs/redis");
const statusCodes = require("../constants/status_code");
const errorMessages = require("../constants/error_msg");

exports.register = async (req, res) => {
  try {
    const data = req.body;
    if (!data) return res.json({ message: "Cannot register" });
    const encryptedPassword = await bcrypt.hash(
      data.user_password,
      parseInt(properties.HASH_ROUND)
    );
    await user
      .create({
        user_username: data.user_username,
        user_email: data.user_email,
        user_phone: data.user_phone,
        user_password: encryptedPassword,
        user_firstName: data.user_firstName,
        user_lastName: data.user_lastName,
      })
      .then(() => {
        return res.status(201).json({ message: "Registration successful" });
      })
      .catch((err) => {
        if (err.errors) {
          const keys = Object.keys(err.errors);
          const errMsg = {};
          keys.map((key) => (errMsg[key] = err.errors[key].message));
          return res.status(500).json(errMsg);
        }
        if (err.code === 11000) {
          const errMsg = Object.keys(err.keyValue);
          return res.status(500).json({
            error: `Your ${errMsg} is already in use`,
          });
        }
        return res.status(500).json(err);
      });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      message: errorMessages.INTERNAL_SERVER_ERROR,
      error: error.message,
    });
  }
};
exports.get_current_user = async (req, res, next) => {
  try {
    const u = await user.findOne({ user_username: req.user_username });
    if (!u) {
      return res.status(404).json({ error: "Not found this user" });
    }
    return res.status(200).json(u);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
exports.sign_in = async (req, res) => {
  try {
    const JWT_SECRET_KEY = properties.JWT_SECRET_KEY;
    const JWT_SECRET_REFRESH_KEY = properties.JWT_SECRET_REFRESH_KEY;
    const JWT_ACCESS_TOKEN_LIFE = parseInt(properties.JWT_ACCESS_TOKEN_LIFE);
    const JWT_REFRESH_TOKEN_LIFE = parseInt(properties.JWT_REFRESH_TOKEN_LIFE);
    const data = req.body;
    if (!data) return res.json({ message: "Cannot login" });
    const u = await user.findOne({
      user_username: data.user_username,
    });
    if (u && (await bcrypt.compare(data.user_password, u.user_password))) {
      const accessToken = await jwtAuth.generateAccessToken(
        u,
        JWT_SECRET_KEY,
        JWT_ACCESS_TOKEN_LIFE
      );
      const refreshToken = await jwtAuth.generateRefreshToken(
        u,
        JWT_SECRET_REFRESH_KEY,
        JWT_REFRESH_TOKEN_LIFE
      );
      res.setHeader("set-cookie", "accessToken", accessToken, {
        httpOnly: true,
        secure: true,
      });
      res.setHeader("set-cookie", "refresh_token", refreshToken, {
        httpOnly: true,
        secure: true,
      });
      return res.status(200).json({
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    }
    return res
      .status(400)
      .json({ message: "Wrong user_username or user_password" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
exports.refresh_token = async (req, res, next) => {
  try {
    const JWT_SECRET_KEY = properties.JWT_SECRET_KEY;
    const JWT_SECRET_REFRESH_KEY = properties.JWT_SECRET_REFRESH_KEY;
    const JWT_ACCESS_TOKEN_LIFE = parseInt(properties.JWT_ACCESS_TOKEN_LIFE);
    const JWT_REFRESH_TOKEN_LIFE = parseInt(properties.JWT_REFRESH_TOKEN_LIFE);
    const refreshToken = req.headers["authorization"].split(" ")[1];
    if (refreshToken) {
      const u = await jwtAuth.verifyRefreshToken(refreshToken);
      const newToken = await jwtAuth.generateAccessToken(
        u.data,
        JWT_SECRET_KEY,
        JWT_ACCESS_TOKEN_LIFE
      );
      const newRefreshToken = await jwtAuth.generateRefreshToken(
        u.data,
        JWT_SECRET_REFRESH_KEY,
        JWT_REFRESH_TOKEN_LIFE
      );
      return res.status(201).json({
        accessToken: newToken,
        refreshToken: newRefreshToken,
      });
    }
    return res.status(404).json({ message: "Require refresh token" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.logout = async (req, res, next) => {
  try {
    const refreshToken = req.headers["authorization"].split(" ")[1];
    console.log(refreshToken);
    if (!refreshToken) {
      return res.status(404).json({ message: "Require refresh token" });
    }
    const u = await jwtAuth.verifyRefreshToken(refreshToken);
    redisClient.del(u.data.id, (err) => {
      if (err) return res.status(500).json({ error: err });
      return res.status(200).json({ message: "Logout successful" });
    });
  } catch (err) {
    next(err);
  }
};
