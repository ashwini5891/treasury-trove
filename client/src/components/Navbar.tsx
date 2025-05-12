import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Event Manager
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/events">
            Events
          </Button>
          <Button color="inherit" component={RouterLink} to="/events/new">
            Create Event
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
