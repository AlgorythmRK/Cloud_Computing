import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExpenseTable = ({ expenses, onDeleteExpense }) => {
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [deleteLoading, setDeleteLoading] = useState(null);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedExpenses = [...expenses]?.sort((a, b) => {
    let aValue = a?.[sortField];
    let bValue = b?.[sortField];

    if (sortField === 'date') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleDelete = async (expenseId) => {
    if (!expenseId) return;
    setDeleteLoading(expenseId);
    try {
      await onDeleteExpense(expenseId);
    } catch (error) {
      console.error('Error deleting expense:', error);
    } finally {
      setDeleteLoading(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const SortButton = ({ field, children }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center space-x-1 text-left font-medium text-foreground hover:text-primary smooth-transition"
    >
      <span>{children}</span>
      <Icon
        name={
          sortField === field
            ? sortDirection === 'asc'
              ? 'ChevronUp'
              : 'ChevronDown'
            : 'ChevronsUpDown'
        }
        size={16}
      />
    </button>
  );

  if (!expenses || expenses.length === 0) {
    return (
      <div className="bg-card rounded-xl p-6 shadow-subtle">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Expenses</h3>
        <div className="text-center py-12">
          <Icon name="Receipt" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No expenses recorded yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Add your first expense to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl shadow-subtle overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Recent Expenses</h3>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-3 text-left">
                <SortButton field="date">Date</SortButton>
              </th>
              <th className="px-6 py-3 text-left">
                <SortButton field="category">Category</SortButton>
              </th>
              <th className="px-6 py-3 text-left">
                <SortButton field="amount">Amount</SortButton>
              </th>
              <th className="px-6 py-3 text-left">Note</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedExpenses?.map((expense) => {
              const expenseId = expense?._id || expense?.id;
              return (
                <tr key={expenseId} className="hover:bg-muted/30 smooth-transition">
                  <td className="px-6 py-4 text-sm text-foreground">
                    {formatDate(expense?.date)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {expense?.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">
                    ₹{expense?.amount?.toLocaleString('en-IN')}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground max-w-xs truncate">
                    {expense?.note}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(expenseId)}
                      loading={deleteLoading === expenseId}
                      iconName="Trash2"
                      className="text-error hover:text-error hover:bg-error/10"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-border">
        {sortedExpenses?.map((expense) => {
          const expenseId = expense?._id || expense?.id;
          return (
            <div key={expenseId} className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {expense?.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(expense?.date)}
                    </span>
                  </div>
                  <p className="text-lg font-semibold text-foreground">
                    ₹{expense?.amount?.toLocaleString('en-IN')}
                  </p>
                  {expense?.note && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {expense?.note}
                    </p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(expenseId)}
                  loading={deleteLoading === expenseId}
                  iconName="Trash2"
                  className="text-error hover:text-error hover:bg-error/10 ml-2"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExpenseTable;
