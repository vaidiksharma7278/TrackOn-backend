"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _courseService = _interopRequireDefault(require("../services/course-service"));

var _APIResponse = _interopRequireDefault(require("../helpers/APIResponse"));

var _discussionService = _interopRequireDefault(require("../services/discussion-service"));

var _userService = _interopRequireDefault(require("../services/user-service"));

var _projectService = _interopRequireDefault(require("../services/project-service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class CourseController {
  async addCourse(req, res) {
    let {
      name,
      channel,
      description,
      thumbnail,
      video,
      channelImage,
      tags,
      level,
      category,
      domain,
      aboutChannel
    } = req.body;

    try {
      let course = await _courseService.default.findCourse({
        name,
        channel
      });

      if (course) {
        return _APIResponse.default.validationError(res, "course already exists");
      }

      tags = tags.split(",");
      course = await _courseService.default.createCourse({
        name,
        channel,
        description,
        thumbnail,
        video,
        channelImage,
        tags,
        level,
        category,
        domain,
        aboutChannel
      });
      const discussion = await _discussionService.default.create({
        courseId: course._id
      });
      course.discussionId = discussion._id;
      course.save();
      return _APIResponse.default.successResponseWithData(res, course.toObject(), "course created");
    } catch (err) {
      console.log(err);
      return _APIResponse.default.errorResponse(res);
    }
  }

  async editCourse(req, res) {
    let {
      id,
      name,
      channel,
      description,
      thumbnail,
      video,
      channelImage,
      tags,
      level
    } = req.body;

    try {
      let course = await _courseService.default.findCourse({
        _id: id
      });

      if (typeof tags === "string") {
        tags = tags.split(",");
      }

      course = await _courseService.default.updateCourse(id, {
        name,
        channel,
        description,
        thumbnail,
        video,
        channelImage,
        tags,
        level
      });
      return _APIResponse.default.successResponseWithData(res, course, "course created");
    } catch (err) {
      console.log(err);
      return _APIResponse.default.errorResponse(res);
    }
  }

  async deleteCourse(req, res) {
    const {
      id
    } = req.params;

    try {
      const course = await _courseService.default.deleteCourse(id);
      return _APIResponse.default.successResponseWithData(res, course, "course deleted");
    } catch (err) {
      console.log(err);
      return _APIResponse.default.errorResponse(res, err);
    }
  }

  async getAllCourses(req, res) {
    try {
      const courses = await _courseService.default.getAllCourses();
      return _APIResponse.default.successResponseWithData(res, courses);
    } catch (err) {
      console.log(err);
      return _APIResponse.default.errorResponse(res);
    }
  }

  async getCourseById(req, res) {
    const {
      id
    } = req.params;

    try {
      const course = await _courseService.default.findCourse({
        _id: id
      });

      if (!course) {
        return _APIResponse.default.notFoundResponse(res, "Not Found");
      }

      let projects = await _projectService.default.getMany({
        courseId: course._id
      });

      if (!projects) {
        projects = [];
      }

      const data = _objectSpread(_objectSpread({}, course.toObject()), {}, {
        projects
      });

      return _APIResponse.default.successResponseWithData(res, data);
    } catch (err) {
      console.log(err);
      return _APIResponse.default.errorResponse(res);
    }
  }

  async getPublishedCourses(req, res) {
    const {
      category
    } = req.query;

    try {
      let courses = await _courseService.default.getAllCourses();
      courses = courses.filter(e => e.isPublished);
      courses = courses.filter(e => e.category === category);
      return _APIResponse.default.successResponseWithData(res, courses);
    } catch (err) {
      console.log(err);
      return _APIResponse.default.errorResponse(res);
    }
  }

  async publishCourse(req, res) {
    const {
      id
    } = req.params;

    try {
      const course = await _courseService.default.findCourse({
        _id: id
      });
      course.isPublished = true;
      await course.save();
      return _APIResponse.default.successResponseWithData(res, course, "Course Published");
    } catch (err) {
      console.log(err);
      return _APIResponse.default.errorResponse(res);
    }
  }

  async unPublishCourse(req, res) {
    const {
      id
    } = req.params;

    try {
      const course = await _courseService.default.findCourse({
        _id: id
      });
      course.isPublished = false;
      await course.save();
      return _APIResponse.default.successResponseWithData(res, course, "Course Published");
    } catch (err) {
      console.log(err);
      return _APIResponse.default.errorResponse(res);
    }
  }

  async enrollCourse(req, res) {
    const {
      id
    } = req.params;
    const {
      _id
    } = req.user;

    try {
      const course = await _courseService.default.findCourse({
        _id: id
      });
      const user = await _userService.default.findUser({
        _id
      });
      const check = course.students.find(e => e === _id);

      if (check) {
        return _APIResponse.default.validationError(res, "Already Enrolled");
      }

      user.courseEnrolled.push(id);
      course.students.push(_id);
      await course.save();
      await user.save();
      return _APIResponse.default.successResponseWithData(res, user, "Enrolled 🎉");
    } catch (err) {
      console.log(err);
      return _APIResponse.default.errorResponse(res);
    }
  }

  async getEnrolledCourses(req, res) {
    const {
      user
    } = req;

    try {
      const courses = await _courseService.default.getAllCourses({
        students: _mongoose.default.Types.ObjectId(user._id)
      });
      return _APIResponse.default.successResponseWithData(res, courses);
    } catch (err) {
      console.log(err);
      return _APIResponse.default.errorResponse(res);
    }
  }

}

var _default = new CourseController();

exports.default = _default;