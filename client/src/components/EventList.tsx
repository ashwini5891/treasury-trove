import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Box,
  LinearProgress,
} from '@mui/material';
import { getEvents } from '../services/api';
import { Event } from '../models/types';

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleViewTransactions = (eventId: number) => {
    navigate(`/events/${eventId}/transactions`);
  };

  const handleEditEvent = (eventId: number) => {
    navigate(`/events/${eventId}/edit`);
  };

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">Events</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/events/new')}
        >
          Create Event
        </Button>
      </Box>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        {events.map((event) => (
          <div key={event.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h2">
                  {event.name}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {formatDate(event.eventDate)} • {event.location}
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  {event.description || 'No description provided.'}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2">Budget: ${event.budget.toFixed(2)}</Typography>
                  <Typography variant="subtitle2" color={event.balance >= 0 ? 'success.main' : 'error.main'}>
                    Balance: ${event.balance.toFixed(2)}
                  </Typography>
                  <Typography variant="caption" display="block" color="textSecondary">
                    Created: {new Date(event.createdAt).toLocaleString()}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleViewTransactions(event.id)}
                >
                  View Transactions
                </Button>
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => handleEditEvent(event.id)}
                >
                  Edit
                </Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default EventList;
