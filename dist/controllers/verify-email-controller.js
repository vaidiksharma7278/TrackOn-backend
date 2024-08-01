"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ejs = _interopRequireDefault(require("ejs"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _APIResponse = _interopRequireDefault(require("../helpers/APIResponse"));

var _mailService = _interopRequireDefault(require("../services/mail-service"));

var _userService = _interopRequireDefault(require("../services/user-service"));

var _magicTokenService = _interopRequireDefault(require("../services/magic-token-service"));

var _hashService = _interopRequireDefault(require("../services/hash-service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class VerifyEmailController {
  async sendLink(req, res) {
    try {
      const user = await _userService.default.findUser({
        _id: req?.user?._id
      });

      if (!user) {
        return _APIResponse.default.notFoundResponse(res, "user not found");
      }

      if (user?.verified) {
        return _APIResponse.default.validationErrorWithData(res, "user already verified");
      }

      const {
        resetToken,
        token
      } = await _magicTokenService.default.generate(user._id);

      if (!resetToken) {
        return _APIResponse.default.errorResponse(res, "internal server error");
      }

      const link = `${process.env.CLIENT_URL}/auth/verify-email/?userId=${user._id}&token=${resetToken}`; // send the email template

      const data = await _ejs.default.renderFile(`${__dirname}/../mails/verify-email.ejs`, {
        email: user.email,
        name: user.name,
        link
      }, {
        async: true
      });
      const emailSent = await _mailService.default.send(user.email, "Email Verification", data);

      if (!emailSent) {
        await _magicTokenService.default.remove(token);
        return _APIResponse.default.errorResponse(res);
      }

      return _APIResponse.default.successResponseWithData(res, user.email, "email sent");
    } catch (err) {
      console.log(err);
      return _APIResponse.default.errorResponse(res, "error in verification");
    }
  }

  async verify(req, res) {
    try {
      const {
        userId,
        token
      } = req.body;
      const emailVerificationToken = await _magicTokenService.default.findOne({
        userId: _mongoose.default.Types.ObjectId(userId)
      });

      if (!emailVerificationToken) {
        return _APIResponse.default.validationError(res, "invalid or expired token");
      }

      const isValid = await _hashService.default.compare(token, emailVerificationToken.token);

      if (!isValid) {
        return _APIResponse.default.validationError(res, "invalid or expired token 2");
      }

      const user = await _userService.default.findUser({
        _id: userId
      });
      user.verified = true;
      await user.save();
      await emailVerificationToken.deleteOne();
      await _mailService.default.send(user.email, "Email verified", `Your email ${user.email} is verified.`);
      return _APIResponse.default.successResponse(res, "Email Verifed");
    } catch (err) {
      console.log(err);
      return _APIResponse.default.errorResponse(res);
    }
  }

}

var _default = new VerifyEmailController();

exports.default = _default;