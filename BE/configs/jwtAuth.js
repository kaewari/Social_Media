const jwt = require("jsonwebtoken");
const properties = process.env;
const redisClient = require("../configs/redis");
/**
 * This module used for generate access token
 * @param user
 * @param secretSignature
 * @param tokenLife
 */
const generateAccessToken = (user, secretSignature, tokenLife) => {
  return new Promise(async (resolve, reject) => {
    const userData = {
      username: user.username,
      id: user._id,
    };
    jwt.sign(
      { data: userData },
      secretSignature,
      {
        algorithm: "HS256",
        expiresIn: tokenLife,
      },
      (error, token) => {
        if (error) {
          return reject(error);
        }
        resolve(token);
      }
    );
  });
};
/**
 * This module used for verify jwt token
 */
const verifyToken = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  const getToken = token.split(" ")[1] ?? token;
  jwt.verify(getToken, properties.JWT_SECRET_KEY, (err, payload) => {
    if (payload) {
      req.user_id = payload.data.id;
      return next();
    }
    if (err) return res.status(401).json({ error: err });
  });
};
/**
 * This module used for generate refresh token
 * @param user
 * @param secretSignature
 * @param tokenLife
 */
const generateRefreshToken = (user, secretSignature, tokenLife) => {
  return new Promise((resolve, reject) => {
    const userData = {
      username: user.username,
      id: user.id,
    };
    jwt.sign(
      { data: userData },
      secretSignature,
      {
        algorithm: "HS256",
        expiresIn: tokenLife,
      },
      (error, refreshToken) => {
        if (error) {
          return reject(error);
        }

        redisClient.setex(
          userData.id,
          properties.JWT_REFRESH_TOKEN_LIFE,
          refreshToken
        );
        resolve(userData.id);
      }
    );
  });
};
/**
 * This module used for verify jwt refresh token
 * @param refreshToken */
const verifyRefreshToken = (refreshToken) => {
  return new Promise((resolve, reject) => {
    redisClient.get(refreshToken, (err, token) => {
      jwt.verify(token, properties.JWT_SECRET_REFRESH_KEY, (error, payload) => {
        if (error) {
          return reject(error);
        }
        return resolve(payload);
      });
    });
  });
};
module.exports = {
  generateAccessToken: generateAccessToken,
  verifyToken: verifyToken,
  generateRefreshToken: generateRefreshToken,
  verifyRefreshToken: verifyRefreshToken,
};
