"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _expressValidator = require("express-validator");

const projectSchema = [(0, _expressValidator.body)("title").not().isEmpty().withMessage("title can't be empty").isLength({
  min: 1,
  max: 100
}).withMessage("title is too long"), (0, _expressValidator.body)("courseId").not().isEmpty().withMessage("invalid course"), (0, _expressValidator.body)("description").not().isEmpty().withMessage("description empty").isLength({
  min: 1,
  max: 1000
}).withMessage("description is too long")];
const feedback = [(0, _expressValidator.body)("message").not().isEmpty().withMessage("empty reply").isLength({
  min: 1,
  max: 300
}).withMessage("feedback is too long"), (0, _expressValidator.body)("id").not().isEmpty().withMessage("invalid project")];
const project = {
  projectSchema,
  feedback
};
var _default = project;
exports.default = _default;