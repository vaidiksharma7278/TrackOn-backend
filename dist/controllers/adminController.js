"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _APIResponse = _interopRequireDefault(require("../helpers/APIResponse"));

var _userService = _interopRequireDefault(require("../services/user-service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AdminController {
  async getUsers(req, res) {
    try {
      let {
        filter
      } = req.body;

      if (!filter) {
        filter = {};
      }

      const users = await _userService.default.getAllUser(filter);
      return _APIResponse.default.successResponseWithData(res, users, "found users");
    } catch (err) {
      console.log(err);
      return _APIResponse.default.errorResponse(res, err);
    }
  }

  async deleteUser(req, res) {
    try {
      const {
        id
      } = req.params;

      if (!id) {
        return _APIResponse.default.validationError(res, "id is required");
      }

      const user = await _userService.default.deleteOne({
        _id: id
      });

      if (!user) {
        return _APIResponse.default.notFoundResponse(res, "user not found");
      }

      return _APIResponse.default.successResponseWithData(res, {
        id
      }, "user delete");
    } catch (err) {
      console.log(err);
      return _APIResponse.default.errorResponse(res, err);
    }
  }

}

var _default = new AdminController();

exports.default = _default;