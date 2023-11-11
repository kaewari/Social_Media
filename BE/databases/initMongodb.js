const mongoose = require("mongoose");

const connectionString = "mongodb://192.168.50.75:27017/social_media_dev";
const DBConnection = () => {
  let instance;
  const initDB = () => {
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.get("debug", { color: true });
    }
    mongoose
      .connect(connectionString, {
        maxPoolSize: 100,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return {
    getInstance() {
      if (!instance) {
        instance = initDB();
      }
    },
  };
};
const instance = DBConnection().getInstance();
module.exports = instance;
