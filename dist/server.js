"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.io = void 0;

var _path = _interopRequireDefault(require("path"));

var _http = require("http");

var _socket = require("socket.io");

var _routes = _interopRequireDefault(require("./routes"));

var _db = _interopRequireDefault(require("./config/db"));

var _sockets = _interopRequireDefault(require("./sockets"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/prefer-default-export */
const express = require("express");

const cors = require("cors");

const morgan = require("morgan");

const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();
const httpServer = (0, _http.createServer)(app); // const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions));

_routes.default.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
});

const io = new _socket.Server(httpServer, {
  cors: {
    origin: [process.env.CLIENT_URL, "http://localhost:3000", "http://localhost:4000"],
    methods: ["GET", "POST", "PUT"]
  }
});
exports.io = io;
const PORT = process.env.PORT || 5000;
const corsOption = {
  credentials: true,
  origin: ["http://localhost:3000", "http://localhost:4000"]
};
app.set("views", _path.default.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(cors(corsOption));
app.use(express.json({
  limit: "5mb"
}));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(_routes.default);
(0, _db.default)();
io.on("connection", socket => (0, _sockets.default)(socket, io)); // base

app.get("/", (req, res) => {
  res.status(200).json({
    msg: "Hello there"
  });
}); // listen

httpServer.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});