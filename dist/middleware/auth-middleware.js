"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _APIResponse = _interopRequireDefault(require("../helpers/APIResponse"));

var _tokenService = _interopRequireDefault(require("../services/token-service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line consistent-return
async function authenticate(req, res, next) {
  try {
    const {
      metrackAccessCookie
    } = req.cookies;

    if (!metrackAccessCookie) {
      return _APIResponse.default.validationErrorWithData(res, "invalid token", "sign in to view");
    }

    const userData = await _tokenService.default.verifyAccessToken(metrackAccessCookie);

    if (!userData) {
      throw new Error();
    }

    req.user = userData;
    next();
  } catch (err) {
    console.log(err);
    return _APIResponse.default.unauthorizedResponse(res, "invalid token");
  }
}

var _default = authenticate;
exports.default = _default;