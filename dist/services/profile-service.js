"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _profileModel = _interopRequireDefault(require("../models/profile-model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProfileService {
  async findOne(filter) {
    try {
      const users = await _profileModel.default.findOne(filter);
      return users;
    } catch (err) {
      return err;
    }
  }

  async addOne(data) {
    console.log(data);
    return _profileModel.default.create(data);
  }

  async updateOne(filter, data) {
    return _profileModel.default.updateOne(filter, data, {
      new: true
    });
  }

}

var _default = new ProfileService();

exports.default = _default;