"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var _APIResponse = _interopRequireDefault(require("../helpers/APIResponse"));

var _projectService = _interopRequireDefault(require("../services/project-service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProjectController {
  async addProject(req, res) {
    try {
      const {
        title,
        courseId,
        description,
        url,
        githubUrl,
        webUrl,
        tags
      } = req.body;
      const {
        user
      } = req;
      const project = await _projectService.default.create({
        title,
        userId: user._id,
        courseId,
        description,
        thumbnail: url,
        githubUrl,
        webUrl,
        tags
      });
      return _APIResponse.default.successResponseWithData(res, project);
    } catch (err) {
      console.log(err);
      return _APIResponse.default.errorResponse(res, err);
    }
  }

  async addFeedback(req, res) {
    try {
      const {
        message,
        id
      } = req.body;
      const {
        user
      } = req;
      const project = await _projectService.default.getOne({
        _id: id
      });

      if (!project) {
        return _APIResponse.default.notFoundResponse(res, "project not found");
      } // temporary (for projects that don't have feedback array in their path yet)


      if (!project.feedbacks) {
        project.feedbacks = [];
        project.save();
      }

      project.feedbacks.push({
        message,
        user: user._id
      });
      project.save();
      return _APIResponse.default.successResponseWithData(res, req.body);
    } catch (err) {
      console.log(err);
      return _APIResponse.default.errorResponse(res, err);
    }
  }

  async getProjects(req, res) {
    console.log("getting projects");

    try {
      const projects = await _projectService.default.getMany({
        userId: _mongoose.Types.ObjectId(req.user._id)
      });
      return _APIResponse.default.successResponseWithData(res, projects);
    } catch (err) {
      return _APIResponse.default.errorResponse(res, err);
    }
  }

  async deleteProject(req, res) {
    try {
      const {
        id
      } = req.params;

      if (!id) {
        return _APIResponse.default.validationError(res, "id is required");
      }

      const deletedProject = await _projectService.default.deleteOne({
        _id: id
      });

      if (!deletedProject) {
        return _APIResponse.default.notFoundResponse(res, "project not found");
      }

      return _APIResponse.default.successResponseWithData(res, {
        id
      }, "project deleted");
    } catch (err) {
      return _APIResponse.default.errorResponse(res, err);
    }
  }

}

var _default = new ProjectController();

exports.default = _default;