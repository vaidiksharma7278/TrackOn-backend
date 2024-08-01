"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const connection = socket => {
  console.log(socket.id, "connected");
  socket.on("join", id => {
    socket.join(id);
  });
};

var _default = connection;
exports.default = _default;