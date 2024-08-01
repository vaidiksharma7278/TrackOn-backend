"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _expressValidator = require("express-validator");

const string = [(0, _expressValidator.body)("message").not().isEmpty().withMessage("empty message").isLength({
  min: 1,
  max: 600
}).withMessage("message is too long")];
const reply = [(0, _expressValidator.body)("reply").not().isEmpty().withMessage("empty reply").isLength({
  min: 1,
  max: 300
}).withMessage("reply is too long")];
const message = {
  string,
  reply
};
var _default = message;
exports.default = _default;