import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';

function Header() {
  return (
    <AppBar 
      position="static" 
      sx={{ 
        background: 'linear-gradient(180deg, #1A1A1A 0%, #2D2D2D 100%)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
        marginBottom: '20px'
      }}
    >
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Typography 
          variant="h5" 
          component={RouterLink} 
          to="/"
          sx={{ 
            textDecoration: 'none',
            color: 'rgba(255, 255, 255, 0.87)',
            fontWeight: 'bold',
            marginRight: '40px',
            '&:hover': {
              color: '#BB86FC'
            }
          }}
        >
          LLM Compare
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/"
            sx={{ 
              color: '#fff',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
              }
            }}
          >
            Text
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/image"
            sx={{ 
              color: '#fff',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
              }
            }}
          >
            Image
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/tutorial"
            sx={{ 
              color: '#fff',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
              }
            }}
          >
            Tutorial
          </Button>
          <Button
            color="inherit"
            href="https://github.com/maxchapin/LLMCompare"
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<GitHubIcon />}
            sx={{ 
              color: '#fff',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
              }
            }}
          >
            GitHub
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
