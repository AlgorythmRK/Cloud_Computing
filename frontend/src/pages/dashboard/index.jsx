import React, { useState, useEffect } from "react";
import DashboardNavigation from "../../components/ui/DashboardNavigation";
import SummaryCard from "./components/SummaryCard";
import ExpenseChart from "./components/ExpenseChart";
import AddExpenseForm from "./components/AddExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import InsightCard from "./components/InsightCard";
import { API_BASE_URL, getAuthHeaders } from "../../config/api";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load expenses from backend
  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/expenses`, {
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
          },
        });

        const data = await res.json();

        if (!res.ok) {
          console.error("Error loading expenses:", data?.error || data);
          setLoading(false);
          return;
        }

        setExpenses(data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error loading expenses:", error);
        setLoading(false);
      }
    };

    loadExpenses();
  }, []);

  // Add expense -> POST to backend
  const handleAddExpense = async (newExpense) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/expenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify(newExpense),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Error adding expense:", data?.error || data);
        throw new Error(data?.error || "Error adding expense");
      }

      // backend returns created expense with _id
      setExpenses((prev) => [data, ...prev]);
      return Promise.resolve();
    } catch (error) {
      console.error("Error adding expense:", error);
      throw error;
    }
  };

  // Delete expense -> DELETE to backend
  const handleDeleteExpense = async (expenseId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/expenses/${expenseId}`, {
        method: "DELETE",
        headers: {
          ...getAuthHeaders(),
        },
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Error deleting expense:", data?.error || data);
        throw new Error(data?.error || "Error deleting expense");
      }

      setExpenses((prev) => prev.filter((exp) => exp._id !== expenseId && exp.id !== expenseId));
      return Promise.resolve();
    } catch (error) {
      console.error("Error deleting expense:", error);
      throw error;
    }
  };

  // Summary statistics
  const totalExpenses = expenses?.reduce(
    (sum, expense) => sum + (expense?.amount || 0),
    0
  );

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const monthlyExpenses = expenses
    ?.filter((expense) => {
      const d = new Date(expense.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    })
    ?.reduce((sum, expense) => sum + (expense?.amount || 0), 0);

  const categoryCount = new Set(
    expenses.map((expense) => expense.category)
  )?.size;

  const previousMonthExpenses = monthlyExpenses * 0.85; // mock previous month
  const monthlyTrend =
    previousMonthExpenses === 0
      ? undefined
      : monthlyExpenses > previousMonthExpenses
      ? "up"
      : "down";

  const monthlyTrendValue =
    previousMonthExpenses === 0
      ? "0%"
      : `${Math.abs(
          ((monthlyExpenses - previousMonthExpenses) / previousMonthExpenses) *
            100
        ).toFixed(1)}%`;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
        <DashboardNavigation />
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto mb-6"></div>
              <p className="text-muted-foreground text-lg font-medium">
                Loading your financial dashboard...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <DashboardNavigation />
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Welcome Section */}
        <div className="card-premium p-8 text-center bg-fintech-gradient text-white">
          <h1 className="text-4xl font-bold mb-4 tracking-tight">
            Welcome to Your Financial Command Center
          </h1>
          <p className="text-blue-50 text-xl max-w-3xl mx-auto leading-relaxed">
            Track, analyze, and optimize your spending with AI-powered insights
            and professional-grade analytics
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <SummaryCard
            title="Total Expenses"
            value={`₹${totalExpenses?.toLocaleString("en-IN")}`}
            icon="Wallet"
            color="primary"
          />
          <SummaryCard
            title="This Month"
            value={`₹${monthlyExpenses?.toLocaleString("en-IN")}`}
            icon="Calendar"
            trend={monthlyTrend}
            trendValue={monthlyTrendValue}
            color="success"
          />
          <SummaryCard
            title="Categories"
            value={categoryCount?.toString()}
            icon="Tag"
            color="warning"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ExpenseChart expenses={expenses} chartType="pie" />
          <ExpenseChart expenses={expenses} chartType="bar" />
        </div>

        {/* Expense Management Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <AddExpenseForm onAddExpense={handleAddExpense} />
          </div>
          <div className="lg:col-span-3">
            <ExpenseTable
              expenses={expenses}
              onDeleteExpense={handleDeleteExpense}
            />
          </div>
        </div>

        {/* Insights Section */}
        <InsightCard expenses={expenses} />

        {/* Footer */}
        <div className="text-center py-8 border-t border-slate-200">
          <p className="text-muted-foreground">
            © {new Date()?.getFullYear()} FinMitra. Empowering your financial
            journey with intelligent expense tracking.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
