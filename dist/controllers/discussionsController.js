"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _APIResponse = _interopRequireDefault(require("../helpers/APIResponse"));

var _discussionService = _interopRequireDefault(require("../services/discussion-service"));

var _messageService = _interopRequireDefault(require("../services/message-service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class DiscussionController {
  async getDiscussionById(req, res) {
    try {
      const {
        id
      } = req.params;

      if (!id) {
        return _APIResponse.default.validationError(res, "invalid id field");
      }

      const discussion = await _discussionService.default.getOne({
        _id: id
      });

      if (!discussion) {
        return _APIResponse.default.notFoundResponse(res, "discussion not available");
      }

      if (discussion.banned) {
        return _APIResponse.default.notFoundResponse(res, "this discussion is banned");
      }

      let chat = await _messageService.default.getMany({
        discussionId: discussion._id
      });
      console.log({
        chat
      });

      if (!chat) {
        chat = [];
      }

      return _APIResponse.default.successResponseWithData(res, _objectSpread(_objectSpread({}, discussion), {}, {
        chat
      }), "successful");
    } catch (err) {
      console.log(err);
      return _APIResponse.default.errorResponse(res);
    }
  }

  async updateDiscussion(req, res) {
    try {
      const {
        id
      } = req.params;
      const discussion = await _discussionService.default.find({
        _id: id
      });

      if (!discussion) {
        return _APIResponse.default.notFoundResponse(res, "discussion not available");
      }

      if (discussion.banned) {
        return _APIResponse.default.notFoundResponse(res, "this discussion is banned");
      }

      return _APIResponse.default.successResponseWithData(res, discussion);
    } catch (err) {
      console.log(err);
      return _APIResponse.default.errorResponse(res);
    }
  }

  async banDiscussion(req, res) {
    try {
      const {
        id
      } = req.params;
      const discussion = await _discussionService.default.find({
        _id: id
      });

      if (!discussion) {
        return _APIResponse.default.notFoundResponse(res, "discussion not available");
      }

      if (discussion.banned) {
        return _APIResponse.default.notFoundResponse(res, "already banned");
      }

      discussion.banned = true;
      discussion.save();
      return _APIResponse.default.successResponseWithData(res, discussion);
    } catch (err) {
      console.log(err);
      return _APIResponse.default.errorResponse(res);
    }
  }

  async setDiscussionReadOnly(req, res) {
    try {
      const {
        id
      } = req.params;
      const discussion = await _discussionService.default.find({
        _id: id
      });

      if (!discussion) {
        return _APIResponse.default.notFoundResponse(res, "discussion not available");
      }

      if (discussion.readOnly) {
        return _APIResponse.default.validationError(res, "already set to readonly");
      }

      discussion.readOnly = true;
      discussion.save();
      return _APIResponse.default.successResponseWithData(res, discussion);
    } catch (err) {
      console.log(err);
      return _APIResponse.default.errorResponse(res);
    }
  }

  async setDiscussionReadWrite(req, res) {
    try {
      const {
        id
      } = req.params;
      const discussion = await _discussionService.default.find({
        _id: id
      });

      if (!discussion) {
        return _APIResponse.default.notFoundResponse(res, "discussion not available");
      }

      if (!discussion.readOnly) {
        return _APIResponse.default.validationError(res, "already set to read write mode");
      }

      discussion.readOnly = false;
      discussion.save();
      return _APIResponse.default.successResponseWithData(res, discussion);
    } catch (err) {
      console.log(err);
      return _APIResponse.default.errorResponse(res);
    }
  }

}

var _default = new DiscussionController();

exports.default = _default;