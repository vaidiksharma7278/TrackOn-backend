"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const tokenSchema = new _mongoose.Schema({
  token: {
    type: String,
    required: true
  },
  userId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  role: {
    type: Number,
    default: 0,
    required: true
  }
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)("MagicToken", tokenSchema, "magictokens");

exports.default = _default;