"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _expressValidator = require("express-validator");

const email = [(0, _expressValidator.body)("email").isEmail().withMessage("invalid email").normalizeEmail()];
const password = [(0, _expressValidator.body)("password").not().isEmpty().withMessage("password empty").isAscii().withMessage("invalid password").isLength({
  min: 5
}).withMessage("password must be at least 5 characters long")];
const commons = {
  email,
  password
};
var _default = commons;
exports.default = _default;