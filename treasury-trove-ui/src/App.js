import React, { useEffect, useState, useCallback } from 'react';
import { 
  getTransactions, 
  createTransaction, 
  updateTransaction, 
  deleteTransaction, 
  getTransactionById,
  getDeletedTransactions,
  downloadExport 
} from './api';
import TransactionForm from './components/TransactionForm';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [deletedTransactions, setDeletedTransactions] = useState([]);
  const [showDeleted, setShowDeleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [error, setError] = useState(null);
  
  // This would typically come from your auth context
  const currentUserId = '8c7b21c1-46fc-4611-861f-657982fe8b16';

  const fetchTransactions = useCallback(async (includeDeleted = false) => {
    setIsLoading(true);
    setError(null);
    try {
      const [activeData, deletedData] = await Promise.all([
        getTransactions(includeDeleted),
        includeDeleted ? getDeletedTransactions() : Promise.resolve([])
      ]);
      
      setTransactions(Array.isArray(activeData) ? activeData : []);
      setDeletedTransactions(Array.isArray(deletedData) ? deletedData : []);
    } catch (err) {
      console.error("Error loading transactions", err);
      setError('Failed to load transactions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleSubmitTransaction = async (transactionData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      if (editingTransaction) {
        // Update existing transaction
        const updatedTransaction = await updateTransaction(editingTransaction.id, transactionData);
        setTransactions(prevTransactions => 
          prevTransactions.map(tx => 
            tx.id === editingTransaction.id ? updatedTransaction : tx
          )
        );
      } else {
        // Create new transaction
        const newTransaction = await createTransaction(transactionData);
        setTransactions(prevTransactions => [newTransaction, ...prevTransactions]);
      }
      setShowForm(false);
      setEditingTransaction(null);
    } catch (err) {
      console.error("Error saving transaction", err);
      setError(`Failed to ${editingTransaction ? 'update' : 'create'} transaction. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setShowForm(false);
    setEditingTransaction(null);
  };

  const handleToggleView = () => {
    const newShowDeleted = !showDeleted;
    setShowDeleted(newShowDeleted);
    fetchTransactions(newShowDeleted);
  };

  const handleDownloadExport = async () => {
    try {
      const blob = await downloadExport();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `TreasuryTrove_Export_${new Date().toISOString().split('T')[0]}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error downloading export:', error);
      setError('Failed to download export. Please try again.');
    }
  };

  const handleDeleteTransaction = async (id) => {
    if (!window.confirm('Are you sure you want to delete this transaction?')) {
      return;
    }
    
    try {
      await deleteTransaction(id, currentUserId);
      // Instead of removing from state, we'll refresh the list to get the soft-deleted state
      await fetchTransactions(showDeleted);
    } catch (err) {
      console.error("Error deleting transaction", err);
      setError('Failed to delete transaction. Please try again.');
    }
  };
  
  const handleRestoreTransaction = async (id) => {
    try {
      await updateTransaction(id, {
        isDeleted: false,
        updatedBy: currentUserId
      });
      await fetchTransactions(showDeleted);
    } catch (err) {
      console.error("Error restoring transaction", err);
      setError('Failed to restore transaction. Please try again.');
    }
  };
  
  const handlePermanentlyDelete = async (id) => {
    if (!window.confirm('This will permanently delete the transaction. Continue?')) {
      return;
    }
    
    try {
      // Use the deleteTransaction function from the API service
      await deleteTransaction(id, currentUserId, true);
      setDeletedTransactions(prev => prev.filter(tx => tx.id !== id));
    } catch (err) {
      console.error("Error permanently deleting transaction", err);
      setError('Failed to permanently delete transaction.');
    }
  };

  return (
    <div className="app-container">
      {showForm && (
        <TransactionForm 
          onClose={handleCancelEdit}
          onSubmit={handleSubmitTransaction}
          isSubmitting={isSubmitting}
          initialData={editingTransaction}
        />
      )}
      <header className="app-header">
        <h1>TreasuryTrove</h1>
        <div className="header-actions">
          <button onClick={handleDownloadExport} className="export-button">
            Export to Excel
          </button>
          <button 
            onClick={() => setShowForm(true)}
            className="btn-primary"
            disabled={showDeleted}
          >
            Add Transaction
          </button>
          <button 
            onClick={handleToggleView}
            className={`btn-secondary ${showDeleted ? 'active' : ''}`}
          >
            {showDeleted ? 'Show Active' : 'Show Deleted'}
          </button>
        </div>
      </header>
      
      <main className="app-main">
        <div className="transactions-container">
          <div className="transactions-header">
            <h2>Recent Transactions</h2>
            <button 
              className="add-transaction-btn"
              onClick={() => setShowForm(true)}
            >
              + Add Transaction
            </button>
          </div>
          
          {isLoading ? (
            <div className="loading">Loading transactions...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : transactions.length === 0 ? (
            <div className="no-transactions">No transactions found</div>
          ) : (
            <ul className="transactions-list">
              {transactions.map(tx => (
                <li key={tx.id} className="transaction-item">
                  <div className="transaction-actions">
                    {!tx.isDeleted ? (
                      <>
                        <button 
                          className="btn-edit"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditTransaction(tx);
                          }}
                          title="Edit transaction"
                        >
                          ✏️
                        </button>
                        <button 
                          className="btn-delete"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteTransaction(tx.id);
                          }}
                          title="Delete transaction"
                        >
                          🗑️
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          className="btn-restore"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRestoreTransaction(tx.id);
                          }}
                          title="Restore transaction"
                        >
                          ♻️
                        </button>
                        <button 
                          className="btn-delete-permanent"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePermanentlyDelete(tx.id);
                          }}
                          title="Permanently delete"
                        >
                          ⛔
                        </button>
                      </>
                    )}
                  </div>
                  <div className="transaction-amount">
                    {tx.currency} {tx.amount.toFixed(2)}
                  </div>
                  <div className="transaction-details">
                    <div className="transaction-description">{tx.description}</div>
                    <div className="transaction-date">
                      {new Date(tx.timestamp).toLocaleString()}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      
      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Treasury Trove. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
