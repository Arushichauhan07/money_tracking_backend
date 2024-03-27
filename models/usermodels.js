const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const incomes = require("../models/incomes");
const expenses = require("../models/expenses");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  gender: {
    type: String,
  },
  profession: {
    type: String,
  },
  token: {
    type: String,
  },
  incomes: [incomes],
  expenses: [expenses],
});

userSchema.pre("save", async function (next) {
  // console.log("hash");
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

const User = mongoose.model("USER", userSchema);
module.exports = User;
