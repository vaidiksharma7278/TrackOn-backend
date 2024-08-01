"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _refreshModel = _interopRequireDefault(require("../models/refresh-model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TokenService {
  generateToken(payload) {
    const accessToken = _jsonwebtoken.default.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: "6h"
    });

    const refreshToken = _jsonwebtoken.default.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, {
      expiresIn: "1y"
    });

    return {
      accessToken,
      refreshToken
    };
  }

  async storeRefreshToken(userId, token) {
    try {
      return await _refreshModel.default.create({
        token,
        userId
      });
    } catch (err) {
      return err;
    }
  }

  async verifyAccessToken(token) {
    return _jsonwebtoken.default.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
  }

  async verifyRefreshToken(token) {
    return _jsonwebtoken.default.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET);
  }

  async findRefreshToken(userId, refreshToken) {
    return _refreshModel.default.findOne({
      userId,
      token: refreshToken
    });
  }

  async updateRefreshToken(userId, refreshToken) {
    return _refreshModel.default.updateOne({
      userId
    }, {
      token: refreshToken
    });
  }

  async removeToken(refreshToken) {
    return _refreshModel.default.deleteOne({
      token: refreshToken
    });
  }

}

var _default = new TokenService();

exports.default = _default;