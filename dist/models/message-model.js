"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const MessageSchema = new _mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  discussionId: {
    type: _mongoose.Types.ObjectId,
    required: true,
    ref: "Discussion"
  },
  user: {
    type: _mongoose.Types.ObjectId,
    required: true,
    ref: "User"
  },
  replies: [{
    type: _mongoose.Types.ObjectId,
    ref: "Message"
  }],
  isReply: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)("Message", MessageSchema, "messages");

exports.default = _default;