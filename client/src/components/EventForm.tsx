import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  InputAdornment,
  LinearProgress,
  Alert,
} from '@mui/material';
import { getEvent, createEvent, updateEvent } from '../services/api';
import { CreateEventDto } from '../models/types';

const EventForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(isEditing);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<CreateEventDto>({
    name: '',
    description: '',
    eventDate: new Date().toISOString().slice(0, 16),
    location: '',
    budget: 0,
  });

  useEffect(() => {
    if (!isEditing) return;

    const fetchEvent = async () => {
      try {
        const event = await getEvent(parseInt(id!));
        setFormData({
          name: event.name,
          description: event.description,
          eventDate: event.eventDate.slice(0, 16), // Convert to datetime-local format
          location: event.location,
          budget: event.budget,
        });
      } catch (err) {
        setError('Failed to load event');
        console.error('Error fetching event:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: CreateEventDto) => ({
      ...prev,
      [name]: name === 'budget' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isEditing && id) {
        await updateEvent(parseInt(id), formData);
      } else {
        await createEvent(formData);
      }
      navigate('/events');
    } catch (err) {
      setError('Failed to save event. Please try again.');
      console.error('Error saving event:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return <LinearProgress />;
  }

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          {isEditing ? 'Edit Event' : 'Create New Event'}
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Event Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
          />
          
          <TextField
            margin="normal"
            fullWidth
            id="description"
            label="Description"
            name="description"
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
            disabled={loading}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="location"
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            disabled={loading}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="eventDate"
            label="Event Date & Time"
            name="eventDate"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            value={formData.eventDate}
            onChange={handleChange}
            disabled={loading}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="budget"
            label="Budget"
            name="budget"
            type="number"
            inputProps={{
              step: '0.01',
              min: '0'
            }}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            value={formData.budget}
            onChange={handleChange}
            disabled={loading}
          />
          
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              type="button"
              variant="outlined"
              onClick={() => navigate(-1)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {isEditing ? 'Update' : 'Create'} Event
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default EventForm;
