import axios from 'axios';

// Create axios instance with base URL and default headers
const apiClient = axios.create({
  baseURL: 'http://localhost:5210/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Transactions API
export const getTransactions = async () => {
  try {
    const response = await apiClient.get('/transactions');
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

export const createTransaction = async (transactionData) => {
  try {
    const response = await apiClient.post('/transactions', {
      ...transactionData,
      timestamp: new Date().toISOString(),
      description: 'Transaction', // Default description since we removed the field
    });
    return response.data;
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
};

export const updateTransaction = async (id, transactionData) => {
  try {
    const response = await apiClient.put(`/transactions/${id}`, {
      ...transactionData,
      timestamp: transactionData.timestamp || new Date().toISOString(),
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating transaction ${id}:`, error);
    throw error;
  }
};

export const getTransactionById = async (id) => {
  try {
    const response = await apiClient.get(`/transactions/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching transaction ${id}:`, error);
    throw error;
  }
};

export const deleteTransaction = async (id, deletedBy = null, permanent = false) => {
  try {
    const params = {};
    if (deletedBy) {
      params.deletedBy = deletedBy;
    }
    if (permanent) {
      params.permanent = 'true';
    }
    await apiClient.delete(`/transactions/${id}`, { params });
    return id; // Return the deleted transaction ID for reference
  } catch (error) {
    console.error(`Error ${permanent ? 'permanently ' : ''}deleting transaction ${id}:`, error);
    throw error;
  }
};

export const getDeletedTransactions = async () => {
  try {
    const response = await apiClient.get('/transactions', {
      params: { includeDeleted: true }
    });
    return response.data.filter(tx => tx.isDeleted);
  } catch (error) {
    console.error('Error fetching deleted transactions:', error);
    throw error;
  }
};

// Categories API
export const getCategories = async () => {
  try {
    const response = await apiClient.get('/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Events API
export const getEvents = async () => {
  try {
    const response = await apiClient.get('/events');
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

// Users API
export const getUsers = async () => {
  try {
    const response = await apiClient.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Add request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log('Request:', config);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for logging
apiClient.interceptors.response.use(
  (response) => {
    console.log('Response:', response);
    return response;
  },
  (error) => {
    console.error('Response Error:', error.response || error);
    return Promise.reject(error);
  }
);
