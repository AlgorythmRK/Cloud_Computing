import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const ExpenseChart = ({ expenses = [], chartType = 'pie' }) => {
  const safeExpenses = Array.isArray(expenses) ? expenses : [];

  // Category-wise data for pie chart
  const categoryData =
    safeExpenses.reduce((acc, expense) => {
      if (!expense?.category || typeof expense.amount !== 'number') return acc;
      const existing = acc.find((item) => item.name === expense.category);
      if (existing) {
        existing.value += expense.amount;
      } else {
        acc.push({ name: expense.category, value: expense.amount });
      }
      return acc;
    }, []) || [];

  // Daily data (correct last 7 days)
  const dailyDataAll =
    safeExpenses.reduce((acc, expense) => {
      if (!expense?.date || typeof expense.amount !== 'number') return acc;

      const isoDate = expense.date; // e.g. "2025-11-15"
      const label = new Date(isoDate).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
      });

      const existing = acc.find((item) => item.dateKey === isoDate);
      if (existing) {
        existing.amount += expense.amount;
      } else {
        acc.push({ dateKey: isoDate, date: label, amount: expense.amount });
      }
      return acc;
    }, []) || [];

  // Sort by actual date and then take last 7 days
  const dailyData = dailyDataAll
    .sort((a, b) => new Date(a.dateKey) - new Date(b.dateKey))
    .slice(-7);

  const COLORS = [
    '#2563EB',
    '#10B981',
    '#F59E0B',
    '#EF4444',
    '#8B5CF6',
    '#06B6D4',
    '#84CC16',
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevated">
          <p className="text-foreground font-medium">{label}</p>
          <p className="text-primary">
            Amount: ₹{payload[0].value.toLocaleString('en-IN')}
          </p>
        </div>
      );
    }
    return null;
  };

  // If no expenses, show a friendly message
  if (!safeExpenses.length) {
    return (
      <div className="bg-card rounded-xl p-6 shadow-subtle flex items-center justify-center h-64">
        <p className="text-muted-foreground text-sm">
          Not enough data yet. Add some expenses to see{' '}
          {chartType === 'pie' ? 'your expense distribution.' : 'your daily spending trend.'}
        </p>
      </div>
    );
  }

  if (chartType === 'pie') {
    return (
      <div className="bg-card rounded-xl p-6 shadow-subtle">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Expense Distribution
        </h3>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  // Bar chart (daily trend)
  return (
    <div className="bg-card rounded-xl p-6 shadow-subtle">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Daily Spending Trend
      </h3>
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dailyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis
              dataKey="date"
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickFormatter={(value) => `₹${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="amount"
              fill="var(--color-primary)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseChart;
