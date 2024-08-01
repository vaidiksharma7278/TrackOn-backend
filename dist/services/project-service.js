"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _projectModel = _interopRequireDefault(require("../models/project-model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProjectService {
  async getMany(filter) {
    try {
      const projects = await _projectModel.default.find(filter).sort({
        createdAt: -1
      }).limit(20).populate("userId", "name avatar").populate("feedbacks.user", "name avatar").lean();
      return projects;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async getOne(filter) {
    try {
      return await _projectModel.default.findOne(filter);
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async getOneWithoutPopulation(filter) {
    console.log(filter);

    try {
      const projects = await _projectModel.default.findOne(filter);
      console.log(projects, "from service");
      return projects;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async create(data) {
    const project = await _projectModel.default.create(data);
    return project;
  }

  async update(filter, data) {
    return _projectModel.default.updateOne(filter, data, {
      new: true
    });
  }

  async deleteOne(filter) {
    return _projectModel.default.deleteOne(filter);
  }

}

var _default = new ProjectService();

exports.default = _default;