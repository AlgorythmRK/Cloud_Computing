import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AddExpenseForm = ({ onAddExpense }) => {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    note: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categoryOptions = [
    { value: 'Food & Dining', label: 'Food & Dining' },
    { value: 'Transportation', label: 'Transportation' },
    { value: 'Shopping', label: 'Shopping' },
    { value: 'Entertainment', label: 'Entertainment' },
    { value: 'Bills & Utilities', label: 'Bills & Utilities' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'Education', label: 'Education' },
    { value: 'Travel', label: 'Travel' },
    { value: 'Others', label: 'Others' },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const expense = {
        id: Date.now().toString(),
        amount: parseFloat(formData.amount),
        category: formData.category,
        note: formData.note || 'No description',
        date: formData.date,
        createdAt: new Date().toISOString(),
      };

      await onAddExpense(expense);

      // Reset form
      setFormData({
        amount: '',
        category: '',
        note: '',
        date: new Date().toISOString().split('T')[0],
      });
      setErrors({});
    } catch (error) {
      console.error('Error adding expense:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-subtle">
      <h3 className="text-lg font-semibold text-foreground mb-6">Add New Expense</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Amount (₹)"
          type="number"
          placeholder="Enter amount"
          value={formData.amount}
          onChange={(e) => handleChange('amount', e.target.value)}
          error={errors.amount}
          required
          min="0"
          step="0.01"
        />

        <Select
          label="Category"
          placeholder="Select category"
          options={categoryOptions}
          value={formData.category}
          onChange={(value) => handleChange('category', value)}
          error={errors.category}
          required
        />

        <Input
          label="Note"
          type="text"
          placeholder="Add a note (optional)"
          value={formData.note}
          onChange={(e) => handleChange('note', e.target.value)}
        />

        <Input
          label="Date"
          type="date"
          value={formData.date}
          onChange={(e) => handleChange('date', e.target.value)}
          error={errors.date}
          required
        />

        <Button
          type="submit"
          variant="default"
          fullWidth
          loading={isSubmitting}
          iconName="Plus"
          iconPosition="left"
        >
          Add Expense
        </Button>
      </form>
    </div>
  );
};

export default AddExpenseForm;
