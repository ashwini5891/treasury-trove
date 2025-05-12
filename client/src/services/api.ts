import axios from 'axios';
import { CreateEventDto, CreateTransactionDto, Event, Transaction } from '../models/types';

const api = axios.create({
  baseURL: 'http://localhost:5260/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Events API
export const getEvents = async (): Promise<Event[]> => {
  const response = await api.get<Event[]>('/events');
  return response.data;
};

export const getEvent = async (id: number): Promise<Event> => {
  const response = await api.get<Event>(`/events/${id}`);
  return response.data;
};

export const createEvent = async (eventData: CreateEventDto): Promise<Event> => {
  const response = await api.post<Event>('/events', eventData);
  return response.data;
};

export const updateEvent = async (id: number, eventData: CreateEventDto): Promise<void> => {
  await api.put(`/events/${id}`, eventData);
};

export const deleteEvent = async (id: number): Promise<void> => {
  await api.delete(`/events/${id}`);
};

// Transactions API
export const getTransactions = async (eventId: number): Promise<Transaction[]> => {
  const response = await api.get<Transaction[]>(`/events/${eventId}/transactions`);
  return response.data;
};

export const createTransaction = async (eventId: number, transactionData: CreateTransactionDto): Promise<Transaction> => {
  const response = await api.post<Transaction>(`/events/${eventId}/transactions`, transactionData);
  return response.data;
};

export const updateTransaction = async (
  eventId: number,
  id: number,
  transactionData: CreateTransactionDto
): Promise<void> => {
  await api.put(`/events/${eventId}/transactions/${id}`, transactionData);
};

export const deleteTransaction = async (eventId: number, id: number): Promise<void> => {
  await api.delete(`/events/${eventId}/transactions/${id}`);
};

export default api;
