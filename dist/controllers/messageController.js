"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _APIResponse = _interopRequireDefault(require("../helpers/APIResponse"));

var _server = require("../server");

var _discussionService = _interopRequireDefault(require("../services/discussion-service"));

var _messageService = _interopRequireDefault(require("../services/message-service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class MessageController {
  async addMessage(req, res) {
    try {
      const {
        user
      } = req;
      const {
        message,
        discussionId,
        sender
      } = req.body;

      if (!user) {
        return _APIResponse.default.notFoundResponse(res, "invalid user");
      }

      const discussion = await _discussionService.default.getOneWithoutPopulation({
        _id: discussionId
      });

      if (!discussion) {
        return _APIResponse.default.validationError(res, "invalid discussion");
      }

      const savedData = await _messageService.default.create({
        message,
        discussionId: discussion._id,
        user: user._id,
        avatar: user.avatar
      });

      _server.io.to(discussionId).emit("update:message", _objectSpread(_objectSpread({}, savedData.toObject()), {}, {
        user: sender
      }));

      return _APIResponse.default.successResponseWithData(res, savedData, "message saved");
    } catch (err) {
      console.log(err);
      return _APIResponse.default.errorResponse(res);
    }
  }

  async addReply(req, res) {
    try {
      const {
        user
      } = req;
      const {
        discussionId,
        reply,
        messageId,
        sender
      } = req.body;

      if (!discussionId || !reply || !messageId) {
        return _APIResponse.default.validationError(res);
      }

      const discussion = await _discussionService.default.getOneWithoutPopulation({
        _id: discussionId
      });

      if (!discussion) {
        return _APIResponse.default.validationError(res, "invalid discussion");
      }

      const message = await _messageService.default.getOne({
        _id: messageId
      });
      console.log(user, discussionId, reply, messageId, message);

      if (!message) {
        return _APIResponse.default.notFoundResponse(res, "message not found");
      }

      const savedData = await _messageService.default.create({
        message: reply,
        discussionId,
        user: user._id,
        isReply: true,
        avatar: user.avatar
      });

      if (!savedData) {
        return _APIResponse.default.errorResponse(res, "failed to add reply");
      }

      message.replies.push(savedData);
      message.save();

      _server.io.to(discussionId).emit("update:reply", {
        id: message._id,
        data: _objectSpread(_objectSpread({}, savedData.toObject()), {}, {
          user: sender
        })
      });

      return _APIResponse.default.successResponseWithData(res, message);
    } catch (err) {
      console.log(err);
      return _APIResponse.default.errorResponse(res);
    }
  }

}

var _default = new MessageController();

exports.default = _default;