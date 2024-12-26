import React from 'react';
import { TextField, Alert, CircularProgress, Paper, Link, Typography } from '@mui/material';
import ModelSelector from './ModelSelector';

const ModelColumn = ({ 
  selectedModel, 
  onModelChange, 
  apiKey, 
  onApiKeyChange, 
  error, 
  isLoading, 
  output 
}) => {
  // Check if the selected model is a free one
  const isFreeModel = selectedModel?.includes('meta-llama') || 
                     selectedModel?.includes('microsoft') ||
                     selectedModel?.includes('zephyr');

  const getApiKeyLink = (modelId) => {
    if (!isFreeModel) {
      if (modelId?.includes('gpt')) {
        return {
          url: 'https://platform.openai.com/api-keys',
          text: 'Get OpenAI API Key'
        };
      } else if (modelId?.includes('gemini')) {
        return {
          url: 'https://makersuite.google.com/app/apikey',
          text: 'Get Google AI API Key'
        };
      } else if (modelId?.includes('claude')) {
        return {
          url: 'https://console.anthropic.com/account/keys',
          text: 'Get Anthropic API Key'
        };
      } else if (modelId?.includes('mistral')) {
        return {
          url: 'https://console.mistral.ai/api-keys/',
          text: 'Get Mistral API Key'
        };
      }
    }
    return null;
  };

  const apiKeyLink = getApiKeyLink(selectedModel);

  return (
    <Paper 
      elevation={2} 
      className="selOut"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}
    >
      <ModelSelector 
        selectedModel={selectedModel}
        onChange={onModelChange}
      />
      {apiKeyLink && (
        <Typography variant="body2" sx={{ mt: -1, mb: 1 }}>
          <Link 
            href={apiKeyLink.url} 
            target="_blank" 
            rel="noopener noreferrer"
            underline="hover"
          >
            {apiKeyLink.text}
          </Link>
        </Typography>
      )}
      {!isFreeModel && (
        <TextField
          className="keyEntry"
          label="Enter API Key"
          value={apiKey}
          onChange={onApiKeyChange}
          type="password"
          fullWidth
          margin="normal"
          size="small"
        />
      )}
      {error && (
        <Alert severity="error" sx={{ width: '100%' }}>{error}</Alert>
      )}
      {isLoading ? (
        <div className="loading-indicator">
          <CircularProgress size={30} />
        </div>
      ) : (
        <div className="output">
          {output || (isFreeModel ? "Ready to generate with free model" : "Output will appear here")}
        </div>
      )}
    </Paper>
  );
};

export default ModelColumn; 