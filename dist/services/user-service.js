"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _userModel = _interopRequireDefault(require("../models/user-model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserService {
  async findUser(filter) {
    try {
      const users = await _userModel.default.findOne(filter);
      return users;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async getAllUser(filter) {
    const user = await _userModel.default.find(filter);
    return user;
  }

  async createUser(data) {
    const user = await _userModel.default.create(data);
    return user;
  }

  async updateUser(filter, data) {
    return _userModel.default.updateOne(filter, data, {
      new: true
    });
  }

  async deleteOne(filter) {
    return _userModel.default.deleteOne(filter);
  }

}

var _default = new UserService();

exports.default = _default;