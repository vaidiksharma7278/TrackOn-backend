"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _APIResponse = _interopRequireDefault(require("../helpers/APIResponse"));

var _channelService = _interopRequireDefault(require("../services/channel-service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ChannelController {
  async addChannel(req, res) {
    const {
      channelName,
      channelImage,
      aboutChannel
    } = req.body;

    if (!channelName || !channelImage || !aboutChannel) {
      return _APIResponse.default.unauthorizedResponse(res, "All Fields are required");
    }

    try {
      let channel = await _channelService.default.findChannel({
        channelName
      });

      if (channel) {
        return _APIResponse.default.validationError(res, "channel already exists");
      }

      channel = await _channelService.default.createChannel({
        channelName,
        channelImage,
        aboutChannel
      });
      await channel.save();
      return _APIResponse.default.successResponseWithData(res, channel, "channel created");
    } catch (err) {
      console.log(err);
      return _APIResponse.default.errorResponse(res);
    }
  }

  async getAllChannels(req, res) {
    try {
      const channels = await _channelService.default.getAllChannels();
      return _APIResponse.default.successResponseWithData(res, channels);
    } catch (err) {
      console.log(err);
      return _APIResponse.default.errorResponse(res);
    }
  }

  async getChannelById(req, res) {
    const {
      id
    } = req.params;

    try {
      const channel = await _channelService.default.findChannel({
        _id: id
      });

      if (!channel) {
        return _APIResponse.default.notFoundResponse(res);
      }

      return _APIResponse.default.successResponseWithData(res, channel);
    } catch (err) {
      console.log(err);
      return _APIResponse.default.errorResponse(res);
    }
  }

}

var _default = new ChannelController();

exports.default = _default;