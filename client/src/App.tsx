import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

// Components
import EventList from './components/EventList';
import EventForm from './components/EventForm';
import TransactionList from './components/TransactionList';
import Navbar from './components/Navbar';

// Theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Navigate to="/events" replace />} />
              <Route path="/events" element={<EventList />} />
              <Route path="/events/new" element={<EventForm />} />
              <Route path="/events/:id/edit" element={<EventForm />} />
              <Route path="/events/:eventId/transactions" element={<TransactionList />} />
            </Routes>
          </Box>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
