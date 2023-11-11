const redis = require("ioredis");

const client = redis.createClient({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
});
client.on("connect", () => {
  console.log("connected to redis successfully!");
});
client.on("error", (err) => {
  console.log("error: " + err.message);
});
module.exports = client;
