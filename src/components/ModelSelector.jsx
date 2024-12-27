import React from 'react';
import { Select, MenuItem, FormControl, InputLabel, ListSubheader } from '@mui/material';

const ModelSelector = ({ selectedModel, onChange }) => {
  const MODELS = {
    'Large Models': [
      { id: 'gpt-4-turbo-preview', name: 'GPT-4 Turbo', paid: true },
      { id: 'claude-3-opus-20240229', name: 'Claude 3 Opus', paid: true },
      { id: 'gemini-pro', name: 'Gemini Pro', paid: true },
      { id: 'mistral-large-latest', name: 'Mistral Large', paid: true },
      { id: 'meta-llama/Llama-2-70b-chat-hf', name: 'Llama 2 70B', paid: false, requiresPro: true },
      { id: 'mistralai/Mixtral-8x7B-Instruct-v0.1', name: 'Mixtral 8x7B', paid: false }
    ],
    'Medium Models': [
      { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', paid: true },
      { id: 'claude-3-sonnet-20240229', name: 'Claude 3 Sonnet', paid: true },
      { id: 'mistral-medium', name: 'Mistral Medium', paid: true },
      { id: 'meta-llama/Llama-2-13b-chat-hf', name: 'Llama 2 13B', paid: false, requiresPro: true }
    ],
    'Small Models': [
      { id: 'mistral-small', name: 'Mistral Small', paid: true },
      { id: 'claude-3-haiku-20240307', name: 'Claude 3 Haiku', paid: true },
      { id: 'meta-llama/Llama-2-7b-chat-hf', name: 'Llama 2 7B', paid: false, requiresPro: true },
      { id: 'microsoft/phi-2', name: 'Phi-2', paid: false },
      { id: 'HuggingFaceH4/zephyr-7b-beta', name: 'Zephyr 7B', paid: false }
    ]
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Select Model</InputLabel>
      <Select
        value={selectedModel || ''}
        onChange={onChange}
        label="Select Model"
      >
        {Object.entries(MODELS).map(([category, models]) => [
          <ListSubheader key={category}>{category}</ListSubheader>,
          ...models.map(model => (
            <MenuItem key={model.id} value={model.id}>
              {model.name} 
              {model.paid ? ' (Paid)' : ' (Free)'} 
              {model.requiresPro ? ' (Requires Hugging Face Pro)' : ''}
            </MenuItem>
          ))
        ])}
      </Select>
    </FormControl>
  );
};

export default ModelSelector; 