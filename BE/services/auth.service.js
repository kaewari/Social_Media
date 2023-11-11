const user = require("../models/user");
const properties = process.env;
const crypto = require("crypto");
const bcrypt = require("bcrypt");
class authService {
  static async sign_up({
    email,
    phone,
    lastName,
    firstName,
    username,
    password,
  }) {
    try {
      const checkExistUsername = user.findOne({ username: username });
      if (checkExistUsername) {
        response(409, "This username already exists", "error");
      }
      const encryptedPassword = await bcrypt.hash(
        password,
        parseInt(properties.HASH_ROUND)
      );
      const newUser = await user.create({
        username: username,
        email: email,
        phone: phone,
        password: encryptedPassword,
        firstName: firstName,
        lastName: lastName,
      });
      if (newUser) {
        // Create private key and public key for the new user
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa");
        console.log({ privateKey: privateKey, publicKey: publicKey });
        response(201, "Registed", "success");
      }
    } catch (error) {
      response(500, error.message, "error");
    }
  }
}
module.exports = authService;
