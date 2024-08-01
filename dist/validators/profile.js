"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _expressValidator = require("express-validator");

const update = [(0, _expressValidator.body)("hashnode").isLength({
  min: 0,
  max: 30
}).withMessage("hashnode username is too long"), (0, _expressValidator.body)("github").isLength({
  min: 0,
  max: 30
}).withMessage("github username is too long"), (0, _expressValidator.body)("linkedin").isLength({
  min: 0,
  max: 30
}).withMessage("linkedin username is too long"), (0, _expressValidator.body)("about").isLength({
  min: 0,
  max: 2000
}).withMessage("about description is too long")];
const profile = {
  update
};
var _default = profile;
exports.default = _default;