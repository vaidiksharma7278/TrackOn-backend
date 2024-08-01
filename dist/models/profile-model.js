"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const profileSchema = new _mongoose.default.Schema({
  user: {
    type: _mongoose.default.Types.ObjectId,
    ref: "User",
    required: true
  },
  avatar: {
    type: String
  },
  hashnode: {
    type: String
  },
  github: {
    type: String
  },
  linkedin: {
    type: String
  },
  about: {
    type: String
  }
}, {
  timestamps: true
});

var _default = _mongoose.default.model("Profile", profileSchema, "profiles");

exports.default = _default;