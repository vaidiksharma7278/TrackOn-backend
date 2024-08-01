"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const CourseSchema = new _mongoose.Schema({
  name: {
    type: String
  },
  students: [{
    type: _mongoose.Types.ObjectId,
    ref: 'User'
  }],
  channel: {
    type: String
  },
  description: {
    type: String
  },
  category: {
    type: String
  },
  domain: {
    type: String
  },
  aboutChannel: {
    type: String
  },
  thumbnail: {
    type: String
  },
  channelImage: {
    type: String
  },
  respect: {
    type: Number,
    default: 0
  },
  video: {
    type: String
  },
  tags: [{
    type: String
  }],
  level: {
    type: String
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  discussionId: {
    type: _mongoose.Types.ObjectId,
    ref: "Discussion"
  }
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)("Course", CourseSchema, "courses");

exports.default = _default;