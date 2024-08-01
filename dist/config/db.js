"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const mongoose = require("mongoose");

const options = {
  autoIndex: false,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4,
  useNewUrlParser: true
};

const DBConnect = async () => {
  try {
    const response = await mongoose.connect(process.env.CONNECTION_STRING, options);

    if (response) {
      console.log("MongoDB connected...");
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

var _default = DBConnect;
exports.default = _default;