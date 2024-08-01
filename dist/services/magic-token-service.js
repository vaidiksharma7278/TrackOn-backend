"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

var _tokenModel = _interopRequireDefault(require("../models/token-model"));

var _hashService = _interopRequireDefault(require("./hash-service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MagicTokenService {
  async generate(userId) {
    let token = await _tokenModel.default.findOne({
      userId
    });
    if (token) await token.deleteOne();

    const resetToken = _crypto.default.randomBytes(32).toString("hex");

    const hash = await _hashService.default.encrypt(resetToken);
    token = await new _tokenModel.default({
      userId,
      token: hash
    }).save();
    return {
      resetToken,
      token
    };
  }

  async findOne(filter) {
    return _tokenModel.default.findOne(filter);
  }

  async remove(filter) {
    return _tokenModel.default.deleteOne(filter);
  }

}

var _default = new MagicTokenService();

exports.default = _default;