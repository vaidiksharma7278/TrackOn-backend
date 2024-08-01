"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const DiscussionModel = new _mongoose.Schema({
  courseId: {
    type: _mongoose.Types.ObjectId,
    required: true,
    ref: "Course"
  },
  banned: {
    type: Boolean,
    default: false
  },
  readOnly: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)("Discussion", DiscussionModel, "discussions");

exports.default = _default;