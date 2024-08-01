"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = validate;

var _expressValidator = require("express-validator");

var _APIResponse = _interopRequireDefault(require("../helpers/APIResponse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line consistent-return
function validate(req, res, next) {
  const errors = (0, _expressValidator.validationResult)(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array({
      onlyFirstError: true
    })[0];
    console.log(firstError);
    return _APIResponse.default.validationErrorWithData(res, firstError, firstError?.msg);
  }

  next();
}