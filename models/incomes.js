const mongoose = require('mongoose');

const incomes = mongoose.Schema({
    title: {
        type: String,
      },
      amount: {
        type: Number,
      },
      date: {
        type: Date,
      },
      category: {
        type: String,
      },
      type:{
        type: String,
        default: "income"
      },
      description: {
        type: String,
      }
    }, { timestamps : {createdAt: 'created' , updatedAt: 'modified' }})
    
module.exports = incomes;