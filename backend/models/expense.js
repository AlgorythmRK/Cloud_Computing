const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    note: { type: String, default: "No description" },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
