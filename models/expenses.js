const mongoose = require('mongoose');

const expenses = mongoose.Schema({
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
        default: "expense"
      },
      description: {
        type: String,
      }
    }, { timestamps : {createdAt: 'created' , updatedAt: 'modified' }})
    
module.exports = expenses;