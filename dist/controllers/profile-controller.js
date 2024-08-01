"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _APIResponse = _interopRequireDefault(require("../helpers/APIResponse"));

var _projectService = _interopRequireDefault(require("../services/project-service"));

var _profileService = _interopRequireDefault(require("../services/profile-service"));

var _courseService = _interopRequireDefault(require("../services/course-service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProfileController {
  async update(req, res) {
    try {
      const {
        user
      } = req;
      console.log(user._id);
      const {
        hashnode,
        avatar,
        github,
        linkedin,
        about
      } = req.body;
      let profile = await _profileService.default.findOne({
        user: user._id
      });

      if (!profile) {
        profile = await _profileService.default.addOne({
          user: _mongoose.default.Types.ObjectId(user._id),
          hashnode,
          github,
          avatar,
          linkedin,
          about
        });
      } else {
        profile = await _profileService.default.updateOne({
          user: user._id
        }, {
          user: _mongoose.default.Types.ObjectId(user._id),
          hashnode,
          github,
          linkedin,
          avatar,
          about
        });
      }

      return _APIResponse.default.successResponseWithData(res, profile);
    } catch (err) {
      console.log(err);
      return _APIResponse.default.errorResponse(res);
    }
  }

  async getProfile(req, res) {
    try {
      const {
        id
      } = req.params;
      console.log({
        id
      });
      const profile = await _profileService.default.findOne({
        user: _mongoose.default.Types.ObjectId(id)
      });
      let projects = [];
      let courses = [];

      try {
        projects = await _projectService.default.getMany({
          userId: _mongoose.default.Types.ObjectId(id)
        });
      } catch (err) {
        console.log(err, "error in finding projects");
      }

      try {
        courses = await _courseService.default.getAllCourses({
          students: _mongoose.default.Types.ObjectId(id)
        });
      } catch (err) {
        console.log(err, "error in finding courses");
      }

      return _APIResponse.default.successResponseWithData(res, {
        profile: profile && profile.toObject(),
        projects,
        courses
      });
    } catch (err) {
      console.log(err);
      return _APIResponse.default.errorResponse(res, err);
    }
  }

}

var _default = new ProfileController();

exports.default = _default;