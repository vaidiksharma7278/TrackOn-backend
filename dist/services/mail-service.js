"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nodemailer = require("nodemailer");

class MailService {
  async send(email, subject, body) {
    try {
      const transporter = (0, _nodemailer.createTransport)({
        host: process.env.HOST,
        service: process.env.SERVICE,
        port: 587,
        secure: true,
        auth: {
          user: process.env.USER,
          pass: process.env.PASS
        }
      });
      return await transporter.sendMail({
        from: process.env.USER,
        to: email,
        subject,
        html: body
      });
    } catch (error) {
      return null;
    }
  }

}

var _default = new MailService();

exports.default = _default;