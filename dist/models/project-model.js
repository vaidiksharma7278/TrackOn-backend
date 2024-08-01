"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const ProjectSchema = new _mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  userId: {
    type: _mongoose.Types.ObjectId,
    ref: "User",
    required: true
  },
  courseId: {
    type: _mongoose.Types.ObjectId,
    ref: "Course",
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  thumbnail: {
    type: String
  },
  githubUrl: String,
  webUrl: String,
  tags: [String],
  appreciation: {
    type: Number,
    default: 0
  },
  feedbacks: [{
    message: {
      type: String,
      required: true
    },
    user: {
      type: _mongoose.Types.ObjectId,
      required: true,
      ref: "User"
    }
  }, {
    timestamps: true
  }]
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)("Project", ProjectSchema, "projects");

exports.default = _default;