import React from 'react';
import { Box, Container, Typography, Link, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';

function Footer() {
  return (
    <Box 
      component="footer"
      className='footer'
      sx={{
        backgroundColor: 'var(--elevation-01)',
        padding: '24px 0',
        marginTop: '1%',
        borderTop: '1px solid rgba(255, 255, 255, 0.12)'
      }}
    >
      <Container maxWidth="lg">
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={3} 
          justifyContent="center"
          alignItems="center"
        >
          <Link 
            component={RouterLink} 
            to="/PrivacyPolicy"
            sx={{ 
              color: 'rgba(255, 255, 255, 0.7)',
              textDecoration: 'none',
              '&:hover': { color: '#BB86FC' }
            }}
          >
            Privacy Policy
          </Link>

          <Link 
            href="https://github.com/yourusername/llmcompare"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ 
              color: 'rgba(255, 255, 255, 0.7)',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              textDecoration: 'none',
              '&:hover': { color: '#BB86FC' }
            }}
          >
            <GitHubIcon fontSize="small" /> Source Code
          </Link>

          <Typography 
            variant="body2" 
            color="rgba(255, 255, 255, 0.6)"
          >
            © {new Date().getFullYear()} LLM Compare
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;