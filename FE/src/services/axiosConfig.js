// axiosConfig.js
import axios from "axios";
import cookie from "react-cookies";

const SERVER = "http://localhost:5000";
const VERSION = "/v1";

const authApi = axios.create({
  baseURL: SERVER,
  headers: {
    authorization: cookie.load("accessToken"),
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  },
});

export { VERSION, authApi };
