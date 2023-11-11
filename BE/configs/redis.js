const Redis = require("ioredis");
const maxDelay = 1000;
const maxRetries = 5;
const client = new Redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  retryStrategy: (times) => {
    if (times <= maxRetries) return times * maxDelay;
    else return null;
  },
});
client.on("connect", () => {
  console.log("Connected to redis successfully!");
});
client.on("error", (err) => {
  console.error("Redis error: " + err.message);
});
module.exports = client;
