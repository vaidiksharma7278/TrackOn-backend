"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const ChannelSchema = new _mongoose.Schema({
  channelName: {
    type: String
  },
  aboutChannel: {
    type: String
  },
  channelImage: {
    type: String
  }
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)("Channel", ChannelSchema, "channels");

exports.default = _default;