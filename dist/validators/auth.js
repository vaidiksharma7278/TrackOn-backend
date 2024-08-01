"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _expressValidator = require("express-validator");

const register = [(0, _expressValidator.body)("email").isEmail().withMessage("invalid email").normalizeEmail(), (0, _expressValidator.body)("name").not().isEmpty().withMessage("name can't be empty").isAscii().withMessage("invalid characters in name"), (0, _expressValidator.body)("password").not().isEmpty().withMessage("password empty").isAscii().withMessage("invalid password").isLength({
  min: 5
}).withMessage("password must be at least 5 characters long")];
const login = [(0, _expressValidator.body)("email").isEmail().withMessage("invalid email").normalizeEmail(), (0, _expressValidator.body)("password").not().isEmpty().withMessage("password empty").isAscii().withMessage("invalid password").isLength({
  min: 5
}).withMessage("password must be at least 5 characters long")];
const updatePassword = [(0, _expressValidator.body)("oldPassword").not().isEmpty().withMessage("password empty").isAscii().withMessage("invalid password").isLength({
  min: 5
}).withMessage("password must be at least 5 characters long"), (0, _expressValidator.body)("newPassword").not().isEmpty().withMessage("password empty").isAscii().withMessage("invalid password").isLength({
  min: 5
}).withMessage("password must be at least 5 characters long")];
const auth = {
  register,
  login,
  updatePassword
};
var _default = auth;
exports.default = _default;