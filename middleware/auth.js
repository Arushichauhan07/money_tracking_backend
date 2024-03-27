const jwt = require("jsonwebtoken");
const User = require("../models/usermodels");

exports.Auth = async function (req, res, next) {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userData = await User.findOne({ _id: decoded.id });
    if (userData) {
      req.user = userData;
      next();
    } else {
      res.status(400).send({ message: "user not found" });
    }
    // let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    // this.token = token;
    // await this.save();
    // return token;
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};
