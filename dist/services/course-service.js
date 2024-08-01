"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _courseModel = _interopRequireDefault(require("../models/course-model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CourseService {
  async findCourse(filter) {
    console.log(filter);

    try {
      const course = await _courseModel.default.findOne(filter);
      return course;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async getAllCourses(filter) {
    console.log(filter, "from get all courses");
    const courses = await _courseModel.default.find(filter).limit(100).sort("date");
    console.log({
      courses
    });
    return courses;
  }

  async createCourse(data) {
    return _courseModel.default.create(data);
  }

  async deleteCourse(id) {
    return _courseModel.default.findByIdAndDelete(id);
  }

  async updateCourse(id, data) {
    return _courseModel.default.findByIdAndUpdate(id, data, {
      new: true
    });
  }

}

var _default = new CourseService();

exports.default = _default;