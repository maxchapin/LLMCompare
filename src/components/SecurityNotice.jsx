import React from 'react';
import { Alert, Link } from '@mui/material';

const SecurityNotice = () => {
  return (
    <Alert severity="info">
      <strong>Security Notice:</strong>
      <ul>
        <li>Your API keys are never stored on our servers</li>
        <li>All API calls are made directly from your browser to the AI providers</li>
        <li>This site is open source - <Link href="https://github.com/yourusername/llmcompare" target="_blank" rel="noopener noreferrer">view the code on GitHub</Link></li>
      </ul>
    </Alert>
  );
};

export default SecurityNotice; 