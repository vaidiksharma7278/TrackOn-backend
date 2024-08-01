"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const refreshSchema = new _mongoose.Schema({
  token: {
    type: String,
    required: true
  },
  userId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)("Refresh", refreshSchema, "tokens");

exports.default = _default;