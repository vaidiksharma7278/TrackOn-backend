"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _APIResponse = _interopRequireDefault(require("../helpers/APIResponse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function verifyAdmin(req, res, next) {
  try {
    const {
      role
    } = req.user;

    if (role === undefined) {
      return _APIResponse.default.unauthorizedResponse(res, "user not found");
    }

    if (role >= 2) {
      return next();
    }

    return _APIResponse.default.unauthorizedResponse(res, "invalid admin");
  } catch (err) {
    console.log(err);
    return _APIResponse.default.unauthorizedResponse(res);
  }
}

var _default = verifyAdmin;
exports.default = _default;