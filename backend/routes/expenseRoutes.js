// backend/routes/expenseRoutes.js
const express = require("express");
const Expense = require("../models/expense");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// All routes below require login
router.use(authMiddleware);

// GET /api/expenses -> get all expenses of logged-in user
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.userId }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    console.error("Get expenses error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/expenses -> add new expense
router.post("/", async (req, res) => {
  try {
    const { amount, category, note, date } = req.body;

    if (!amount || !category || !date) {
      return res.status(400).json({ error: "Amount, category, and date are required" });
    }

    const expense = await Expense.create({
      userId: req.userId,
      amount,
      category,
      note: note || "No description",
      date
    });

    res.status(201).json(expense);
  } catch (error) {
    console.error("Create expense error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE /api/expenses/:id -> delete one
router.delete("/:id", async (req, res) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    await expense.deleteOne();
    res.json({ message: "Expense deleted" });
  } catch (error) {
    console.error("Delete expense error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
