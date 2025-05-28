import { supabase } from '../lib/supabase';

// Using the backend running on port 5050
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5050';

// Log the API base URL for debugging
console.log('API Base URL:', API_BASE_URL);

// Helper function to ensure consistent URL formatting
const buildApiUrl = (endpoint) => {
  const base = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
  const path = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${base}/api/${path}`;
};

const getAuthToken = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.access_token;
};

const handleResponse = async (response) => {
  if (!response.ok) {
    let errorMessage = 'An error occurred';
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.title || JSON.stringify(errorData);
    } catch (e) {
      errorMessage = await response.text() || response.statusText;
    }
    throw new Error(errorMessage);
  }
  
  // For 204 No Content responses
  if (response.status === 204) {
    return null;
  }
  
  return response.json();
};

export const fetchTransactions = async (includeDeleted = false) => {
  const token = await getAuthToken();
  let url = buildApiUrl('transactions');
  
  if (includeDeleted) {
    const urlObj = new URL(url);
    urlObj.searchParams.append('includeDeleted', 'true');
    url = urlObj.toString();
  }
  
  console.log('Fetching transactions from:', url);
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  return handleResponse(response);
};

export const fetchTransactionById = async (id) => {
  const token = await getAuthToken();
  const url = buildApiUrl(`transactions/${id}`);
  console.log('Fetching transaction from:', url);
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  return handleResponse(response);
};

export const createTransaction = async (transactionData) => {
  const token = await getAuthToken();
  const url = buildApiUrl('transactions');
  console.log('Creating transaction at:', url);
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(transactionData),
  });

  return handleResponse(response);
};

export const updateTransaction = async (id, transactionData) => {
  const token = await getAuthToken();
  const url = buildApiUrl(`transactions/${id}`);
  console.log('Updating transaction at:', url);
  
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(transactionData),
  });

  return handleResponse(response);
};

export const deleteTransaction = async (id, permanent = false, deletedBy = null) => {
  const token = await getAuthToken();
  const params = new URLSearchParams();
  
  if (permanent) {
    params.append('permanent', 'true');
  }
  if (deletedBy) {
    params.append('deletedBy', deletedBy);
  }
  
  let url = buildApiUrl(`transactions/${id}`);
  if (params.toString()) {
    url += `?${params.toString()}`;
  }
  
  console.log('Deleting transaction at:', url);
  
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  return handleResponse(response);
};
