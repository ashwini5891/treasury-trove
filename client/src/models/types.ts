export interface Event {
  id: number;
  name: string;
  description: string;
  eventDate: string;
  location: string;
  budget: number;
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  createdAt: string;
}

export interface Transaction {
  id: number;
  description: string;
  amount: number;
  transactionDate: string;
  type: 'Income' | 'Expense';
  category: string;
  eventId: number;
  createdAt: string;
}

export interface CreateEventDto {
  name: string;
  description: string;
  eventDate: string;
  location: string;
  budget: number;
}

export interface CreateTransactionDto {
  description: string;
  amount: number;
  type: 'Income' | 'Expense';
  category: string;
  eventId: number;
}

export interface EventFormData extends Omit<CreateEventDto, 'budget'> {
  budget: string;
}

export interface TransactionFormData extends Omit<CreateTransactionDto, 'amount'> {
  amount: string;
}
