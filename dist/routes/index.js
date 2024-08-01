"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _adminController = _interopRequireDefault(require("../controllers/adminController"));

var _authController = _interopRequireDefault(require("../controllers/auth-controller"));

var _channelController = _interopRequireDefault(require("../controllers/channel-controller"));

var _courseController = _interopRequireDefault(require("../controllers/course-controller"));

var _discussionsController = _interopRequireDefault(require("../controllers/discussionsController"));

var _messageController = _interopRequireDefault(require("../controllers/messageController"));

var _profileController = _interopRequireDefault(require("../controllers/profile-controller"));

var _projectController = _interopRequireDefault(require("../controllers/projectController"));

var _verifyEmailController = _interopRequireDefault(require("../controllers/verify-email-controller"));

var _adminMiddleware = _interopRequireDefault(require("../middleware/admin-middleware"));

var _authMiddleware = _interopRequireDefault(require("../middleware/auth-middleware"));

var _validateRequest = require("../middleware/validate-request");

var _auth = _interopRequireDefault(require("../validators/auth"));

var _commons = _interopRequireDefault(require("../validators/commons"));

var _course = _interopRequireDefault(require("../validators/course"));

var _message = _interopRequireDefault(require("../validators/message"));

var _profile = _interopRequireDefault(require("../validators/profile"));

var _project = _interopRequireDefault(require("../validators/project"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)(); // AUTH

router.post("/api/register", _auth.default.register, _authController.default.registerUser);
router.post("/api/login", _auth.default.login, _authController.default.loginUser);
router.get("/api/refresh", _authController.default.refresh);
router.post("/api/logout", _authMiddleware.default, _authController.default.logout);
router.post("/api/request-password-reset", _commons.default.email, _authController.default.requestPasswordReset);
router.post("/api/reset-password", _commons.default.password, _authController.default.resetPassword);
router.post("/api/validate-magictoken", _authController.default.magicTokenValidation);
router.get("/api/verify-email", _authMiddleware.default, _verifyEmailController.default.sendLink);
router.post("/api/verify-email", _verifyEmailController.default.verify);
router.post("/api/update-password", _auth.default.updatePassword, _validateRequest.validate, _authMiddleware.default, _authController.default.updatePassword); // ADMIN AUTH

router.post("/api/admin/login", _auth.default.login, _validateRequest.validate, _authController.default.adminLogin);
router.post("/api/admin/logout", _authController.default.logout); // ADMIN ROUTES

router.post("/api/admin/get-users", _authMiddleware.default, _adminController.default.getUsers);
router.delete("/api/admin/delete-user/:id", _authMiddleware.default, _adminController.default.deleteUser); // DISCUSSIONS

router.get("/api/discussions/:id", _authMiddleware.default, _discussionsController.default.getDiscussionById); // MESSAGES

router.post("/api/messages", _message.default.string, _validateRequest.validate, _authMiddleware.default, _messageController.default.addMessage);
router.post("/api/reply/", _message.default.reply, _validateRequest.validate, _authMiddleware.default, _messageController.default.addReply); // COURSES (ADMIN)

router.post("/api/admin/add-courses", _authMiddleware.default, _course.default.add, _courseController.default.addCourse);
router.delete("/api/admin/delete-course/:id", _authMiddleware.default, _courseController.default.deleteCourse);
router.post("/api/admin/edit-courses", _authMiddleware.default, _course.default.edit, _courseController.default.editCourse);
router.get("/api/admin/get-all-course", _authMiddleware.default, _courseController.default.getAllCourses);
router.get("/api/admin/get-course/:id", _authMiddleware.default, _courseController.default.getCourseById);
router.put("/api/admin/publish-course/:id", _authMiddleware.default, _courseController.default.publishCourse);
router.put("/api/admin/unpublish-course/:id", _authMiddleware.default, _courseController.default.unPublishCourse); // COURSES (USER)

router.get("/api/get-enrolled-courses", _authMiddleware.default, _courseController.default.getEnrolledCourses);
router.get("/api/get-all-course", _courseController.default.getPublishedCourses);
router.get("/api/get-course/:id", _courseController.default.getCourseById);
router.get("/api/enroll-course/:id", _authMiddleware.default, _courseController.default.enrollCourse);
router.get("/api/get-enroll-course", _authMiddleware.default, _courseController.default.enrollCourse); // PROFILE

router.post("/api/profile/:id", _profileController.default.getProfile);
router.post("/api/set-avatar", _authController.default.updateAvatar);
router.put("/api/profile", _profile.default.update, _validateRequest.validate, _authMiddleware.default, _profileController.default.update); // PROJECTS

router.post("/api/projects", _project.default.projectSchema, _validateRequest.validate, _authMiddleware.default, _projectController.default.addProject);
router.get("/api/projects", _authMiddleware.default, _projectController.default.getProjects);
router.post("/api/addFeedback", _project.default.feedback, _validateRequest.validate, _authMiddleware.default, _projectController.default.addFeedback); // CHANNELS (ADMIN)

router.post("/api/admin/add-channel", _authMiddleware.default, _channelController.default.addChannel);
router.get("/api/admin/get-channel/:id", _authMiddleware.default, _channelController.default.getChannelById);
router.get("/api/admin/get-all-channel", _authMiddleware.default, _channelController.default.getAllChannels);
var _default = router;
exports.default = _default;