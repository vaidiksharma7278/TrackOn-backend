"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ejs = _interopRequireDefault(require("ejs"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _APIResponse = _interopRequireDefault(require("../helpers/APIResponse"));

var _magicTokenService = _interopRequireDefault(require("../services/magic-token-service"));

var _tokenService = _interopRequireDefault(require("../services/token-service"));

var _userService = _interopRequireDefault(require("../services/user-service"));

var _mailService = _interopRequireDefault(require("../services/mail-service"));

var _hashService = _interopRequireDefault(require("../services/hash-service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setTokensInCookie(res, token) {
  // put it in cookie
  res.cookie("metrackAccessCookie", token.accessToken, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    // 30 days
    httpOnly: true
  });
  res.cookie("metrackRefreshCookie", token.refreshToken, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    // 30 days
    httpOnly: true
  });
}

class AuthController {
  async refresh(req, res) {
    // getrefresh token from header
    const {
      metrackRefreshCookie: refreshTokenFromCookie
    } = req.cookies; // check if token is valid

    let userData;

    try {
      userData = await _tokenService.default.verifyRefreshToken(refreshTokenFromCookie);
    } catch (err) {
      console.log(err);
      return _APIResponse.default.unauthorizedResponse(res, "invalid token");
    } // check the token is in the db


    try {
      const token = await _tokenService.default.findRefreshToken(userData._id, refreshTokenFromCookie);

      if (!token) {
        return _APIResponse.default.unauthorizedResponse(res, "invalid token");
      }
    } catch (err) {
      console.log(err);
      return _APIResponse.default.errorResponse(res);
    } // check valid user


    const user = await _userService.default.findUser({
      _id: userData._id
    });

    if (!user) {
      return _APIResponse.default.notFoundResponse(res, "user not found");
    } // generate new token


    const {
      accessToken,
      refreshToken
    } = _tokenService.default.generateToken({
      _id: userData._id,
      role: user.role
    }); // update refresh token


    try {
      _tokenService.default.updateRefreshToken(userData._id, refreshToken);
    } catch (err) {
      console.log(err);
      return _APIResponse.default.errorResponse(res);
    }

    setTokensInCookie(res, {
      accessToken,
      refreshToken
    });
    user.password = ""; // response

    return _APIResponse.default.successResponseWithData(res, user);
  }

  async logout(req, res) {
    const {
      metrackRefreshCookie
    } = req.cookies;
    await _tokenService.default.removeToken(metrackRefreshCookie);
    res.clearCookie("metrackRefreshCookie");
    res.clearCookie("metrackAccessCookie");
    return _APIResponse.default.successResponse(res, "logged out");
  }

  async registerUser(req, res) {
    const {
      name,
      email,
      password
    } = req.body;

    try {
      let user = await _userService.default.findUser({
        email
      });
      const hashedPassword = await _hashService.default.encrypt(password);

      if (user) {
        return _APIResponse.default.validationError(res, "user already exists");
      }

      user = await _userService.default.createUser({
        name,
        email,
        password: hashedPassword
      }); // generate new token

      const {
        accessToken,
        refreshToken
      } = _tokenService.default.generateToken({
        _id: user._id,
        role: user.role
      }); // save refresh token in db


      const savedToken = _tokenService.default.storeRefreshToken(user._id, refreshToken);

      if (!savedToken) {
        return _APIResponse.default.errorResponse(res);
      }

      setTokensInCookie(res, {
        accessToken,
        refreshToken
      });
      user.password = "";
      return _APIResponse.default.successResponseWithData(res, user, "account created");
    } catch (err) {
      console.log(err);
      return _APIResponse.default.errorResponse(res);
    }
  }

  async adminLogin(req, res) {
    // const { email, password } = req.body;
    // try {
    //     const user = await userService.findUser({ email });
    //     if (!user) {
    //         return APIResponse.validationError(res, "user not found");
    //     }
    //     const match = await hashService.compare(password, user.password);
    //     if (!match) {
    //         return APIResponse.validationError(res, "wrong credentials");
    //     }
    //     if (user.role < 2) {
    //         return APIResponse.unauthorizedResponse(res, "invalid admin");
    //     }
    //     // generate new token
    //     const { accessToken, refreshToken } = tokenService.generateToken({
    //         _id: user._id,
    //         role: user.role,
    //     });
    //     // save refresh token in db
    //     const savedToken = tokenService.storeRefreshToken(
    //         user._id,
    //         refreshToken
    //     );
    //     if (!savedToken) {
    //         return APIResponse.errorResponse(res);
    //     }
    //     setTokensInCookie(res, { accessToken, refreshToken });
    //     user.password = "";
    //     return APIResponse.successResponseWithData(res, user, "logged in");
    // } catch (err) {
    //     console.log(err);
    //     return APIResponse.errorResponse(res);
    const {
      email,
      password
    } = req.body;

    try {
      const user = await _userService.default.findUser({
        email
      });

      if (!user) {
        return _APIResponse.default.validationError(res, "user not found");
      }

      const match = await _hashService.default.compare(password, user.password);

      if (!match) {
        return _APIResponse.default.validationError(res, "wrong credentials");
      } // generate new token


      const {
        accessToken,
        refreshToken
      } = _tokenService.default.generateToken({
        _id: user._id,
        role: user.role
      }); // save refresh token in db


      const savedToken = _tokenService.default.storeRefreshToken(user._id, refreshToken);

      if (!savedToken) {
        return _APIResponse.default.errorResponse(res);
      }

      setTokensInCookie(res, {
        accessToken,
        refreshToken
      });
      user.password = "";
      return _APIResponse.default.successResponseWithData(res, user, "logged in");
    } catch (err) {
      console.log(err);
      return _APIResponse.default.errorResponse(res);
    }
  }

  async loginUser(req, res) {
    const {
      email,
      password
    } = req.body;

    try {
      const user = await _userService.default.findUser({
        email
      });

      if (!user) {
        return _APIResponse.default.validationError(res, "user not found");
      }

      const match = await _hashService.default.compare(password, user.password);

      if (!match) {
        return _APIResponse.default.validationError(res, "wrong credentials");
      } // generate new token


      const {
        accessToken,
        refreshToken
      } = _tokenService.default.generateToken({
        _id: user._id,
        role: user.role
      }); // save refresh token in db


      const savedToken = _tokenService.default.storeRefreshToken(user._id, refreshToken);

      if (!savedToken) {
        return _APIResponse.default.errorResponse(res);
      }

      setTokensInCookie(res, {
        accessToken,
        refreshToken
      });
      user.password = "";
      return _APIResponse.default.successResponseWithData(res, user, "logged in");
    } catch (err) {
      console.log(err);
      return _APIResponse.default.errorResponse(res);
    }
  }

  async requestPasswordReset(req, res) {
    try {
      const {
        email
      } = req.body;
      const user = await _userService.default.findUser({
        email
      });

      if (!user) {
        return _APIResponse.default.notFoundResponse(res, "user not found");
      }

      const {
        resetToken,
        token
      } = await _magicTokenService.default.generate(user._id);

      if (!resetToken) {
        return _APIResponse.default.errorResponse(res, "internal server error");
      }

      const link = `${process.env.CLIENT_URL}/auth/reset-password?userId=${user._id}&token=${resetToken}`; // send the email template

      const data = await _ejs.default.renderFile(`${__dirname}/../mails/reset-password.ejs`, {
        email: user.email,
        name: user.name,
        link
      }, {
        async: true
      });
      const emailSent = await _mailService.default.send(user.email, "Password reset", data);

      if (!emailSent) {
        await _magicTokenService.default.remove(token);
        return _APIResponse.default.errorResponse(res);
      }

      return _APIResponse.default.successResponseWithData(res, user.email, "email sent");
    } catch (err) {
      console.log(err);
      return _APIResponse.default.errorResponse(res);
    }
  }

  async magicTokenValidation(req, res) {
    try {
      const {
        userId,
        token
      } = req.body;
      const passwordResetToken = await _magicTokenService.default.findOne({
        userId: _mongoose.default.Types.ObjectId(userId)
      });

      if (!passwordResetToken) {
        return _APIResponse.default.validationError(res, "invalid or expired token");
      }

      const isValid = await _hashService.default.compare(token, passwordResetToken.token);

      if (!isValid) {
        return _APIResponse.default.validationError(res, "invalid or expired token 2");
      }

      return _APIResponse.default.successResponse(res, "valid token");
    } catch (err) {
      console.log(err);
      return _APIResponse.default.errorResponse(res);
    }
  }

  async resetPassword(req, res) {
    try {
      const {
        userId,
        token,
        password
      } = req.body;
      const passwordResetToken = await _magicTokenService.default.findOne({
        userId: _mongoose.default.Types.ObjectId(userId)
      });

      if (!passwordResetToken) {
        return _APIResponse.default.validationError(res, "invalid or expired token");
      }

      const isValid = await _hashService.default.compare(token, passwordResetToken.token);

      if (!isValid) {
        return _APIResponse.default.validationError(res, "invalid or expired token 2");
      }

      const hash = await _hashService.default.encrypt(password);
      const user = await _userService.default.findUser({
        _id: userId
      });
      user.password = hash;
      await user.save();
      await passwordResetToken.deleteOne();
      await _mailService.default.send(user.email, "Password changed", `Password changed for ${user.email}`);
      return _APIResponse.default.successResponse(res, "password changed");
    } catch (err) {
      console.log(err);
      return _APIResponse.default.errorResponse(res);
    }
  }

  async updatePassword(req, res) {
    try {
      const {
        oldPassword,
        newPassword
      } = req.body;
      let {
        user
      } = req;
      user = await _userService.default.findUser({
        _id: req.user._id
      });

      if (!user) {
        return _APIResponse.default.validationError(res, "user not found");
      }

      const match = await _hashService.default.compare(oldPassword, user.password);

      if (!match) {
        return _APIResponse.default.validationError(res, "wrong credentials");
      }

      const hash = await _hashService.default.encrypt(newPassword);
      user.password = hash;
      await user.save();
      await _mailService.default.send(user.email, "Password changed", `Password changed for ${user.email}`);
      return _APIResponse.default.successResponse(res, "password changed");
    } catch (err) {
      console.log(err);
      return _APIResponse.default.errorResponse(res);
    }
  }

  async updateAvatar(req, res) {
    const {
      id,
      url
    } = req.body;

    try {
      const user = await _userService.default.findUser({
        _id: id
      });

      if (!user) {
        return _APIResponse.default.validationError(res, "user not found");
      }

      user.avatar = url;
      await user.save();
      return _APIResponse.default.successResponseWithData(res, user, "updated successfully");
    } catch (err) {
      console.log(err);
      return _APIResponse.default.errorResponse(res);
    }
  }

}

var _default = new AuthController();

exports.default = _default;