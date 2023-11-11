const app = require("./app");
const SEVER_PORT = process.env.SEVER_PORT || 5000;
const server = app.listen(SEVER_PORT, () => {
  console.log(`Example app listening on port ${SEVER_PORT}`);
});
process.on("SIGINT", () => {
  server.close(() => {
    console.log(`Exit server on port ${SEVER_PORT}`);
  });
});
