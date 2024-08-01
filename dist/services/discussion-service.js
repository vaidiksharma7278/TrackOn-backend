"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _discussionModel = _interopRequireDefault(require("../models/discussion-model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DiscussionService {
  async getAll(filter) {
    try {
      const discussion = await _discussionModel.default.find(filter).sort("date").limit(100).populate("chat");
      return discussion;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async getOne(filter) {
    try {
      return await _discussionModel.default.findOne(filter).lean();
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async getOneWithoutPopulation(filter) {
    console.log(filter);

    try {
      const discussion = await _discussionModel.default.findOne(filter);
      console.log(discussion, "from service");
      return discussion;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async create(data) {
    const user = await _discussionModel.default.create(data);
    return user;
  }

  async update(filter, data) {
    return _discussionModel.default.updateOne(filter, data, {
      new: true
    });
  }

  async deleteOne(filter) {
    return _discussionModel.default.deleteOne(filter);
  }

}

var _default = new DiscussionService();

exports.default = _default;