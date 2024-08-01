"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const bcrypt = require("bcryptjs");

class HashService {
  async encrypt(payload) {
    try {
      return await bcrypt.hash(payload, 10);
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async compare(actual, latest) {
    return bcrypt.compare(actual, latest);
  }

}

var _default = new HashService();

exports.default = _default;