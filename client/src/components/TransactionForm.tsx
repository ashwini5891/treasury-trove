import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  FormControl,
  SelectChangeEvent,
  Box,
  LinearProgress,
  Alert,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import { parseISO } from 'date-fns/parseISO';
import { createTransaction, updateTransaction } from '../services/api';
import { Transaction, CreateTransactionDto } from '../models/types';

interface TransactionFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  eventId: number;
  transaction?: Transaction | null;
}

const categories = [
  'Food & Drinks',
  'Transportation',
  'Accommodation',
  'Entertainment',
  'Supplies',
  'Marketing',
  'Staff',
  'Venue',
  'Other',
];

const TransactionForm: React.FC<TransactionFormProps> = ({
  open,
  onClose,
  onSubmit,
  eventId,
  transaction,
}) => {
  const isEditing = Boolean(transaction);
  
  const [formData, setFormData] = useState<CreateTransactionDto>({
    description: '',
    amount: 0,
    type: 'Expense',
    category: 'Other',
    eventId,
  });
  
  const [transactionDate, setTransactionDate] = useState<Date | null>(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (transaction) {
      setFormData({
        description: transaction.description,
        amount: transaction.amount,
        type: transaction.type as 'Income' | 'Expense',
        category: transaction.category,
        eventId,
      });
      setTransactionDate(parseISO(transaction.transactionDate));
    } else {
      setFormData({
        description: '',
        amount: 0,
        type: 'Expense',
        category: 'Other',
        eventId,
      });
      setTransactionDate(new Date());
    }
  }, [transaction, eventId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prev: CreateTransactionDto) => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!transactionDate) {
      setError('Please select a transaction date');
      return;
    }

    const transactionData = {
      ...formData,
      transactionDate: format(transactionDate, 'yyyy-MM-dd\'T\'HH:mm:ss'),
    };

    try {
      setLoading(true);
      setError(null);

      if (isEditing && transaction) {
        await updateTransaction(eventId, transaction.id, transactionData);
      } else {
        await createTransaction(eventId, transactionData);
      }
      
      onSubmit();
      onClose();
    } catch (err) {
      setError('Failed to save transaction. Please try again.');
      console.error('Error saving transaction:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEditing ? 'Edit Transaction' : 'Add New Transaction'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <FormControl fullWidth margin="normal">
            <TextField
              select
              label="Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              disabled={loading}
            >
              <MenuItem value="Income">Income</MenuItem>
              <MenuItem value="Expense">Expense</MenuItem>
            </TextField>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
              select
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              disabled={loading}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>


          <TextField
            margin="normal"
            required
            fullWidth
            id="description"
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            disabled={loading}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="amount"
            label="Amount"
            name="amount"
            type="number"
            inputProps={{
              step: '0.01',
              min: '0.01'
            }}
            InputProps={{
              startAdornment: '$',
            }}
            value={formData.amount}
            onChange={handleChange}
            disabled={loading}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box mt={2}>
              <DatePicker
                label="Transaction Date"
                value={transactionDate}
                onChange={(newValue: Date | null) => setTransactionDate(newValue)}
                disabled={loading}
                slotProps={{
                  textField: {
                    fullWidth: true
                  }
                }}
              />
            </Box>
          </LocalizationProvider>
        </DialogContent>
        
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {isEditing ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
      
      {loading && <LinearProgress />}
    </Dialog>
  );
};

export default TransactionForm;
