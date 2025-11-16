import React, { useState, useEffect, useMemo } from "react";
import Icon from "../../../components/AppIcon";

const InsightCard = ({ expenses = [] }) => {
  const [currentInsight, setCurrentInsight] = useState(0);

  const insights = useMemo(() => {
    const list = [];

    const hasExpenses = expenses && expenses.length > 0;
    if (!hasExpenses) {
      return [
        {
          type: "welcome",
          icon: "Sparkles",
          title: "Welcome to FinMitra",
          message:
            "Start adding your expenses to unlock personalised insights about your spending habits.",
          color: "primary",
        },
        {
          type: "tip",
          icon: "Lightbulb",
          title: "Pro tip",
          message:
            "Begin by logging your daily spends for a week. Even small transactions like snacks and rides matter.",
          color: "success",
        },
      ];
    }

    // ---------- Basic aggregates ----------
    const totalSpending = expenses.reduce(
      (sum, expense) => sum + (expense?.amount || 0),
      0
    );

    const today = new Date();
    const uniqueDays = new Set(
      expenses.map((e) =>
        new Date(e.date).toISOString().split("T")[0]
      )
    ).size;
    const dailyAverage =
      uniqueDays > 0 ? Math.round(totalSpending / uniqueDays) : 0;

    // Category-wise
    const categorySpendingMap = {};
    expenses.forEach((expense) => {
      if (!expense?.category) return;
      categorySpendingMap[expense.category] =
        (categorySpendingMap[expense.category] || 0) +
        (expense?.amount || 0);
    });

    const categoryEntries = Object.entries(categorySpendingMap);
    const topCategoryEntry =
      categoryEntries.length > 0
        ? categoryEntries.sort(([, a], [, b]) => b - a)[0]
        : null;

    // Daily spending
    const dailyMap = {};
    expenses.forEach((expense) => {
      const key = new Date(expense.date)
        .toISOString()
        .split("T")[0];
      dailyMap[key] = (dailyMap[key] || 0) + (expense?.amount || 0);
    });

    const dailyEntries = Object.entries(dailyMap);
    const highestDayEntry =
      dailyEntries.length > 0
        ? dailyEntries.sort(([, a], [, b]) => b - a)[0]
        : null;

    // This month vs last month
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const lastMonthDate = new Date(today);
    lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
    const lastMonth = lastMonthDate.getMonth();
    const lastMonthYear = lastMonthDate.getFullYear();

    let thisMonthTotal = 0;
    let lastMonthTotal = 0;

    expenses.forEach((expense) => {
      const d = new Date(expense.date);
      const m = d.getMonth();
      const y = d.getFullYear();
      const amt = expense?.amount || 0;

      if (m === currentMonth && y === currentYear) {
        thisMonthTotal += amt;
      } else if (m === lastMonth && y === lastMonthYear) {
        lastMonthTotal += amt;
      }
    });

    // ---------- Dynamic Insights ----------

    // 1) Total + average
    if (totalSpending > 0) {
      list.push({
        type: "spending",
        icon: "TrendingUp",
        title: "Total spending overview",
        message: `You've spent ₹${totalSpending.toLocaleString(
          "en-IN"
        )} in the tracked period. Your average daily spend is around ₹${dailyAverage.toLocaleString(
          "en-IN"
        )}.`,
        color: "primary",
      });
    }

    // 2) Top category
    if (topCategoryEntry && totalSpending > 0) {
      const [catName, catAmount] = topCategoryEntry;
      const percentage = ((catAmount / totalSpending) * 100).toFixed(0);
      list.push({
        type: "category",
        icon: "PieChart",
        title: "Where most of your money goes",
        message: `${catName} accounts for ${percentage}% of your expenses (₹${catAmount.toLocaleString(
          "en-IN"
        )}). Consider setting a soft limit for this category.`,
        color: "warning",
      });
    }

    // 3) Highest spending day
    if (highestDayEntry) {
      const [dayKey, amount] = highestDayEntry;
      const dateObj = new Date(dayKey);
      const formatted = dateObj.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      list.push({
        type: "day",
        icon: "BarChart2",
        title: "Your most expensive day",
        message: `Your highest spending day was ${formatted} with total expenses of ₹${amount.toLocaleString(
          "en-IN"
        )}. Reviewing that day can reveal impulse or one-time spends.`,
        color: "primary",
      });
    }

    // 4) Month-on-month comparison
    if (thisMonthTotal > 0 || lastMonthTotal > 0) {
      if (lastMonthTotal === 0 && thisMonthTotal > 0) {
        list.push({
          type: "month",
          icon: "Calendar",
          title: "New month, new tracking",
          message: `You're actively tracking spending this month (₹${thisMonthTotal.toLocaleString(
            "en-IN"
          )}). Stay consistent to build a clear pattern of your finances.`,
          color: "success",
        });
      } else if (lastMonthTotal > 0) {
        const diff = thisMonthTotal - lastMonthTotal;
        const pct = lastMonthTotal
          ? ((diff / lastMonthTotal) * 100).toFixed(1)
          : 0;

        if (diff > 0) {
          list.push({
            type: "month",
            icon: "TrendingUp",
            title: "Spending increased this month",
            message: `Your spending is up by ₹${diff.toLocaleString(
              "en-IN"
            )} (${pct}%) compared to last month. Review recurring subscriptions and non-essential spends.`,
            color: "error",
          });
        } else if (diff < 0) {
          list.push({
            type: "month",
            icon: "TrendingDown",
            title: "Nice! Spending down this month",
            message: `You've reduced spending by ₹${Math.abs(
              diff
            ).toLocaleString("en-IN")} (${Math.abs(
              pct
            )}%) compared to last month. Keep this streak going!`,
            color: "success",
          });
        } else {
          list.push({
            type: "month",
            icon: "Minus",
            title: "Consistent spending pattern",
            message:
              "Your overall spending is almost the same as last month. This is a good point to decide if you want to save more or invest more.",
            color: "primary",
          });
        }
      }
    }

    // ---------- Static tips (added after data-based insights) ----------
    const tips = [
      {
        type: "tip",
        icon: "Lightbulb",
        title: "Smart saving tip",
        message:
          "Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings. Use categories to see where you stand.",
        color: "success",
      },
      {
        type: "tip",
        icon: "Target",
        title: "Set category budgets",
        message:
          "Pick 2–3 categories where you overspend and assign monthly limits. Track them using FinMitra.",
        color: "primary",
      },
      {
        type: "tip",
        icon: "Shield",
        title: "Build an emergency fund",
        message:
          "Aim for 3–6 months of expenses as an emergency fund. Start small and automate regular contributions.",
        color: "success",
      },
      {
        type: "tip",
        icon: "Calendar",
        title: "Weekly reviews",
        message:
          "Spend 5 minutes every weekend reviewing your expenses. Small tweaks here save a lot over a year.",
        color: "primary",
      },
    ];

    return list.concat(tips);
  }, [expenses]);

  useEffect(() => {
    if (!insights || insights.length === 0) return;

    const interval = setInterval(() => {
      setCurrentInsight((prev) => (prev + 1) % insights.length);
    }, 6000); // rotate every 6s

    return () => clearInterval(interval);
  }, [insights]);

  const currentInsightData = insights[currentInsight] || insights[0];

  const colorClasses = {
    primary: "bg-primary/10 text-primary border-primary/20",
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/20",
    error: "bg-error/10 text-error border-error/20",
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-subtle border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">AI Insights</h3>
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            {insights?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentInsight(index)}
                className={`w-2 h-2 rounded-full smooth-transition ${
                  index === currentInsight
                    ? "bg-primary"
                    : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div
        className={`p-4 rounded-lg border ${
          colorClasses[currentInsightData?.color] ||
          colorClasses.primary
        }`}
      >
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-0.5">
            <Icon name={currentInsightData?.icon || "Sparkles"} size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium mb-2">
              {currentInsightData?.title || "Insight"}
            </h4>
            <p className="text-sm opacity-90 leading-relaxed">
              {currentInsightData?.message}
            </p>
          </div>
        </div>
      </div>

      {insights?.length > 1 && (
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            Insight {currentInsight + 1} of {insights.length} • Auto-rotating
            every 6s
          </p>
        </div>
      )}
    </div>
  );
};

export default InsightCard;
