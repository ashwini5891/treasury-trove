import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
  LinearProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';
import { Add, Edit, Delete, ArrowBack } from '@mui/icons-material';
import { getTransactions, deleteTransaction, getEvent } from '../services/api';
import { Transaction, Event } from '../models/types';
import TransactionForm from './TransactionForm';
import Alert from '@mui/material/Alert';

const TransactionList: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [transactionToEdit, setTransactionToEdit] = useState<Transaction | null>(null);
  const [transactionToDelete, setTransactionToDelete] = useState<Transaction | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const fetchData = useCallback(async () => {
    if (!eventId) return;
    
    try {
      setLoading(true);
      const [transactionsData, eventData] = await Promise.all([
        getTransactions(Number(eventId)),
        getEvent(Number(eventId)),
      ]);
      
      setTransactions(transactionsData);
      setEvent(eventData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    if (eventId) {
      fetchData();
    }
  }, [eventId, fetchData]);

  const handleAddTransaction = () => {
    setTransactionToEdit(null);
    setIsFormOpen(true);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setTransactionToEdit(transaction);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (transaction: Transaction) => {
    setTransactionToDelete(transaction);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!transactionToDelete || !eventId) return;
    
    try {
      setLoading(true);
      await deleteTransaction(parseInt(eventId), transactionToDelete.id);
      await fetchData();
    } catch (err) {
      setError('Failed to delete transaction');
      console.error('Error deleting transaction:', err);
    } finally {
      setLoading(false);
      setIsDeleteDialogOpen(false);
      setTransactionToDelete(null);
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setTransactionToEdit(null);
  };

  const handleFormSubmit = async () => {
    await fetchData();
    setIsFormOpen(false);
    setTransactionToEdit(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading && !event) {
    return <LinearProgress />;
  }

  if (!event) {
    return (
      <Container>
        <Typography>Event not found</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <IconButton onClick={() => navigate('/events')} sx={{ mr: 1 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h5" component="h1">
          {event.name} - Transactions
        </Typography>
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <div>
            <Typography variant="subtitle1">
              <strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString()}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Location:</strong> {event.location}
            </Typography>
          </div>
          <div>
            <Typography variant="h6" align="right">
              Budget: ${event.budget.toFixed(2)}
            </Typography>
            <Typography variant="h6" color={event.balance >= 0 ? 'success.main' : 'error.main'}>
              Balance: ${event.balance.toFixed(2)}
            </Typography>
          </div>
        </Box>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Transactions</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleAddTransaction}
          disabled={loading}
        >
          Add Transaction
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && !transactions.length ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <LinearProgress />
                </TableCell>
              </TableRow>
            ) : transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No transactions found
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{formatDate(transaction.transactionDate)}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>
                    <Chip
                      label={transaction.type}
                      color={transaction.type === 'Income' ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    {transaction.type === 'Expense' ? '-' : ''}${transaction.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleEditTransaction(transaction)}
                      disabled={loading}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteClick(transaction)}
                      disabled={loading}
                      color="error"
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TransactionForm
        open={isFormOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        eventId={parseInt(eventId!)}
        transaction={transactionToEdit}
      />

      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this transaction? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            disabled={loading}
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TransactionList;
