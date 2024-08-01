"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _expressValidator = require("express-validator");

const common = [(0, _expressValidator.body)("name").not().isEmpty().withMessage("name is required"), (0, _expressValidator.body)("channel").not().isEmpty().withMessage("channel is required").isLength({
  min: 1,
  max: 100
}).withMessage("field channel is too long"), (0, _expressValidator.body)("description").not().isEmpty().withMessage("description is required").isLength({
  min: 1,
  max: 2000
}).withMessage("description is too long"), (0, _expressValidator.body)("thumbnail").not().isEmpty().withMessage("thumbnail is required").isLength({
  min: 1,
  max: 400
}).withMessage("field thumbnail is too long"), (0, _expressValidator.body)("video").not().isEmpty().withMessage("video is required").isLength({
  min: 1,
  max: 400
}).withMessage("field video is too long"), (0, _expressValidator.body)("channelImage").not().isEmpty().withMessage("channelImage is required").isLength({
  min: 1,
  max: 400
}).withMessage("field channelImage is too long"), (0, _expressValidator.body)("level").not().isEmpty().withMessage("level is required"), (0, _expressValidator.body)("tags").not().isEmpty().withMessage("tags is required").isLength({
  min: 1,
  max: 400
}).withMessage("field tags is too long"), (0, _expressValidator.body)("aboutChannel").not().isEmpty().isLength({
  min: 1,
  max: 2000
}).withMessage("field aboutChannel is too long").withMessage("aboutChannel is required")];
const add = [...common, (0, _expressValidator.body)("category").not().isEmpty().withMessage("category is required"), (0, _expressValidator.body)("domain").not().isEmpty().withMessage("domain is required")];
const edit = [...common];
const course = {
  add,
  edit
};
var _default = course;
exports.default = _default;