const User = require("../models/usermodels");

const addIncome = async (req, res) => {
  const { title, amount, date, category, description } = req.body;
  const userData = req.user;

  try {
    if (!title || !amount || !date || !category || !description) {
      return res.status(400).send({ message: "fill all the fields properly" });
    }
    if (amount <= 0) {
      return res
        .status(400)
        .send({ message: "amount must be a positive number" });
    }

    userData.incomes.push({
      title: title,
      amount: amount,
      date: date,
      category: category,
      description: description,
    });
    await userData.save();
    res.status(200).send({ message: "Income Added" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
};
const getIncome = async (req, res) => {
  try {
    const userData = req.user;
    if (userData) {
      const userIncome = userData.incomes;
      console.log("userIncome", userIncome);
      res.status(200).send({ data: userIncome });
    } else {
      res.status(200).send({ message: "user not found", data: [] });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.log(error);
  }
};
const deleteIncome = async (req, res) => {
  try {
    const userData = req.user;
    const { id } = req.params;
    const income_id = userData.incomes.find(x => x._id == id);
    if(income_id != undefined){
      const item_index = userData.incomes.indexOf(income_id);
      userData.incomes.splice(item_index,1);
      await userData.save();
    }
    res.status(200).send({message: "Income deleted successfully" })
  } catch (error) {
    console.log(error);
    res.status(500).send({message:error.message})
  }
};

module.exports = { addIncome, getIncome, deleteIncome };
