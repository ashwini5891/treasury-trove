import React, { useEffect, useState } from 'react';
import { getTransactions } from './api';

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions()
      .then(response => setTransactions(response.data))
      .catch(err => console.error("Error loading transactions", err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Transactions</h1>
      <ul>
        {transactions.map(tx => (
          <li key={tx.id}>
            {tx.amount} {tx.currency} – {tx.description} – {new Date(tx.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
