import React, { useState, useEffect } from 'react';

const TransactionForm = ({ onClose, onSubmit, isSubmitting = false, initialData = null }) => {
  const [formData, setFormData] = useState({
    amount: '',
    currency: 'USD',
    personId: '8c7b21c1-46fc-4611-861f-657982fe8b16',
    eventId: 'b3908145-cf69-449c-a0b5-969e73a457d2',
    categoryId: 'ea205f0a-e17c-4c7d-969e-579bc9ce6928'
  });

  // Initialize form with initialData if in edit mode
  useEffect(() => {
    if (initialData) {
      setFormData({
        amount: initialData.amount.toString(),
        currency: initialData.currency,
        personId: initialData.userProfileId || '8c7b21c1-46fc-4611-861f-657982fe8b16',
        eventId: initialData.eventId || 'b3908145-cf69-449c-a0b5-969e73a457d2',
        categoryId: initialData.categoryId || 'ea205f0a-e17c-4c7d-969e-579bc9ce6928'
      });
    }
  }, [initialData]);

  // Hardcoded values as per requirements
  const person = {
    id: '8c7b21c1-46fc-4611-861f-657982fe8b16',
    name: 'Default User'
  };

  const event = {
    id: 'b3908145-cf69-449c-a0b5-969e73a457d2',
    name: 'Default Event'
  };

  const category = {
    id: 'ea205f0a-e17c-4c7d-969e-579bc9ce6928',
    name: 'Default Category'
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || '' : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert amount to number and ensure proper format
    const submissionData = {
      ...formData,
      amount: parseFloat(formData.amount),
      // Ensure these are valid UUIDs or null
      categoryId: formData.categoryId || null,
      eventId: formData.eventId || null,
      userProfileId: formData.personId // Map personId to userProfileId for the API
    };
    
    onSubmit(submissionData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{initialData ? 'Edit' : 'Add New'} Transaction</h2>
          <button onClick={onClose} className="close-button">×</button>
        </div>
        
        <form onSubmit={handleSubmit}>


          <div className="form-row">
            <div className="form-group amount-group">
              <label htmlFor="amount">Amount</label>
              <div className="input-with-currency">
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0.01"
                  required
                  className="amount-input"
                  inputMode="decimal"
                />
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="currency-select"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="personId">Person</label>
              <select
                id="personId"
                name="personId"
                value={formData.personId}
                onChange={handleChange}
                disabled
              >
                <option value={person.id}>{person.name}</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="eventId">Event</label>
              <select
                id="eventId"
                name="eventId"
                value={formData.eventId}
                onChange={handleChange}
                disabled
              >
                <option value={event.id}>{event.name}</option>
              </select>
            </div>
          </div>


          <div className="form-group">
            <label htmlFor="categoryId">Category</label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              disabled
            >
              <option value={category.id}>{category.name}</option>
            </select>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              onClick={onClose}
              className="btn btn-secondary"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : (initialData ? 'Update' : 'Add')} Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
