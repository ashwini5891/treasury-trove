import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Welcome() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Welcome to Treasury Trove</h1>
        {user?.email && (
          <p className="text-gray-600 mb-6">
            Logged in as: <span className="font-medium">{user.email}</span>
          </p>
        )}
        
        <div className="space-y-4">
          <button
            onClick={() => navigate('/transactions/new')}
            className="w-full flex justify-center py-2 px-6 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Add Transaction
          </button>
          <button
            onClick={() => navigate('/transactions')}
            className="w-full flex justify-center py-2 px-6 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            View Transactions
          </button>
          <button
            onClick={handleSignOut}
            className="w-full flex justify-center py-2 px-6 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
