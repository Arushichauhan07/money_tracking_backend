const User = require("../models/usermodels");

const addExpense = async (req, res) => {
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
    userData.expenses.push({
      title: title,
      amount: amount,
      date: date,
      category: category,
      description: description,
    });
    await userData.save();
    res.status(200).send({ message: "Expense Added" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
};
const getExpense= async (req, res) => {
  try {
    const userData = req.user;
    if (userData) {
      const userExpense = userData.expenses;
      console.log("userExpense", userExpense);
      res.status(200).send({ data: userExpense });
    } else {
      res.status(200).send({ message: "user not found", data: [] });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.log(error);
  }
};
const deleteExpense = async (req, res) => {
   try {
    const userData = req.user;
    const { id } = req.params;
    const expense_id = userData.expenses.find(x => x._id == id);
    if(expense_id != undefined){
      const item_index = userData.expenses.indexOf(expense_id);
      userData.expenses.splice(item_index,1);
      await userData.save();
    }
    res.status(200).send({message: "Income deleted successfully" })
  } catch (error) {
    console.log(error);
    res.status(500).send({message:error.message})
  }
};

module.exports = { addExpense, getExpense, deleteExpense };
