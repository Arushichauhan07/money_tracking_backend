const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/usermodels");
const { addIncome, getIncome, deleteIncome } = require("../controllers/income");
const {
  addExpense,
  getExpense,
  deleteExpense,
} = require("../controllers/expense");
const { Auth } = require("../middleware/auth");
// const addIncome = require("../controllers/income");

router.get("/", (req, res) => {
  res.json({
    message: "Hey there, Welcome to API Service ",
  });
});
router.post("/register", async (req, res) => {
  const { name, email, password, gender, profession } = req.body;
  const data = {
    name: name,
    email: email,
    password: password,
    gender: gender,
    profession: profession,
  };

  if (!name || !email || !password || !gender || !profession) {
    return res.status(422).json("fill properly");
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(403).json({ error: "user already exist" });
    } else {
      const user = new User({
        name,
        email,
        password,
        gender,
        profession,
      });
      await user.save();
      res.status(201).json("user registered successfully");
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/signin", async (req, res) => {
  // console.log(req.body);
  // res.json({ msg: "awesome" });
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Invalid" });
    }
    const userLogin = await User.findOne({ email: email });
    //console.log(userLogin);

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      const token = jwt.sign({ id: userLogin._id }, process.env.SECRET_KEY);
      console.log(token);

      if (!isMatch) {
        res.status(400).json({ error: "error" });
      } else {
        res.json({ msg: "login successfully", token: token });
      }
    } else {
      res.status(400).json({ error: "error" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

router.get("/user-detail", Auth, (req, res) => {
  try {
    const userData = req.user;
    res.status(200).send({ data: userData });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

router
  .post("/add-income", Auth, addIncome)
  .get("/get-incomes", Auth, getIncome)
  .delete("/delete-income/:id", Auth, deleteIncome)
  .post("/add-expense",Auth, addExpense)
  .get("/get-expenses",Auth, getExpense)
  .delete("/delete-expense/:id",Auth, deleteExpense);

module.exports = router;
