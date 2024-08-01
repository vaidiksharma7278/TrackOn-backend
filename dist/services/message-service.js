"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _messageModel = _interopRequireDefault(require("../models/message-model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MessageService {
  async getMany(filter) {
    try {
      return await _messageModel.default.find(filter).where({
        isReply: false
      }).limit(100).sort({
        createdAt: -1
      }).populate("user", "name avatar").populate({
        path: "replies",
        populate: {
          path: "user",
          select: "name avatar"
        }
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async getOne(filter) {
    return _messageModel.default.findOne(filter);
  }

  async create(data) {
    return _messageModel.default.create(data);
  }

  async update(filter, data) {
    return _messageModel.default.updateOne(filter, data, {
      new: true
    });
  }

  async deleteOne(filter) {
    return _messageModel.default.deleteOne(filter);
  }

}

var _default = new MessageService();

exports.default = _default;