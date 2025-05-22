import React, { useEffect, useState } from 'react';
import { getTransactions, createTransaction } from './api';
import TransactionForm from './components/TransactionForm';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getTransactions();
        setTransactions(response.data);
      } catch (err) {
        console.error("Error loading transactions", err);
        setError('Failed to load transactions. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleAddTransaction = async (transactionData) => {
    setIsSubmitting(true);
    try {
      const response = await createTransaction({
        ...transactionData,
        timestamp: new Date().toISOString()
      });
      setTransactions([response.data, ...transactions]);
      setShowForm(false);
    } catch (err) {
      console.error("Error creating transaction", err);
      setError('Failed to create transaction. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-container">
      {showForm && (
        <TransactionForm
          onClose={() => setShowForm(false)}
          onSubmit={handleAddTransaction}
          isSubmitting={isSubmitting}
        />
      )}
      <header className="app-header">
        <h1>Welcome to Treasury Trove</h1>
        <p className="subtitle">Your personal financial management solution</p>
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
                  <div className="transaction-amount">
                    {tx.amount} {tx.currency}
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
