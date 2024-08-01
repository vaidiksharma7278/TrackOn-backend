"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _channelModel = _interopRequireDefault(require("../models/channel-model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ChannelService {
  async findChannel(filter) {
    try {
      const channel = await _channelModel.default.findOne(filter);
      return channel;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async getAllChannels(filter) {
    return _channelModel.default.find(filter);
  }

  async createChannel(data) {
    return _channelModel.default.create(data);
  }

  async deleteChannel(id) {
    return _channelModel.default.findByIdAndDelete(id);
  }

  async updateChannel(id, data) {
    return _channelModel.default.findByIdAndUpdate(id, data, {
      new: true
    });
  }

}

var _default = new ChannelService();

exports.default = _default;