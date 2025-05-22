import axios from 'axios';

const API_BASE_URL = 'http://localhost:5210/api'; // or your .NET port

export const getTransactions = () =>
  axios.get(`${API_BASE_URL}/transactions`);

export const createTransaction = (transaction) =>
  axios.post(`${API_BASE_URL}/transactions`, transaction);

export const getAccounts = () =>
  axios.get(`${API_BASE_URL}/accounts`);

export const createAccount = (account) =>
  axios.post(`${API_BASE_URL}/accounts`, account);

// Add more endpoints as needed...
