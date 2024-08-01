"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userSchema = new _mongoose.default.Schema({
  email: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  courseEnrolled: [{
    type: _mongoose.default.Types.ObjectId,
    ref: "Course"
  }],
  password: {
    type: String,
    required: true
  },
  name: {
    required: true,
    type: String,
    default: "User"
  },
  verified: {
    type: Boolean,
    default: false
  },
  role: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

var _default = _mongoose.default.model("User", userSchema, "users");

exports.default = _default;