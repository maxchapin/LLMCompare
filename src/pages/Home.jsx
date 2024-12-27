import React, { useState } from 'react';
import { Button, TextareaAutosize } from '@mui/material';
import ModelColumn from '../components/ModelColumn';
import { 
  handleOpenAICall, 
  handleGoogleCall, 
  handleClaudeCall, 
  handleMistralCall,
  handleFreeModelCall 
} from '../services/apiHandlers';

function OpenAIComponent() {
  const [inputText, setInputText] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [modelStates, setModelStates] = useState([
    { selectedModel: '', apiKey: '', output: '', isLoading: false, error: null },
    { selectedModel: '', apiKey: '', output: '', isLoading: false, error: null },
    { selectedModel: '', apiKey: '', output: '', isLoading: false, error: null }
  ]);

  const isFreeModel = (model) => {
    return model?.includes('meta-llama') || 
           model?.includes('microsoft') || 
           model?.includes('zephyr');
  };

  const handleInputChange = (event) => {
    const text = event.target.value;
    setInputText(text);
    setCharCount(text.length);
  };

  const handleModelChange = (index) => (event) => {
    const newModelStates = [...modelStates];
    newModelStates[index] = {
      ...newModelStates[index],
      selectedModel: event.target.value
    };
    setModelStates(newModelStates);
  };

  const handleApiKeyChange = (index) => (event) => {
    const newModelStates = [...modelStates];
    newModelStates[index] = {
      ...newModelStates[index],
      apiKey: event.target.value
    };
    setModelStates(newModelStates);
  };

  const generateResponse = async (model, apiKey, index) => {
    if (!model || (!apiKey && !isFreeModel(model)) || !inputText) return;

    setModelStates(prev => {
      const newStates = [...prev];
      newStates[index] = { ...newStates[index], isLoading: true, error: null };
      return newStates;
    });

    try {
      let response;
      if (isFreeModel(model)) {
        response = await handleFreeModelCall(model, apiKey, inputText);
      } else if (model.includes('gpt')) {
        response = await handleOpenAICall(model, apiKey, inputText);
      } else if (model.includes('gemini')) {
        response = await handleGoogleCall(apiKey, inputText);
      } else if (model.includes('claude')) {
        response = await handleClaudeCall(model, apiKey, inputText);
      } else if (model.includes('mistral')) {
        response = await handleMistralCall(model, apiKey, inputText);
      }

      setModelStates(prev => {
        const newStates = [...prev];
        newStates[index] = {
          ...newStates[index],
          output: response,
          isLoading: false
        };
        return newStates;
      });
    } catch (error) {
      setModelStates(prev => {
        const newStates = [...prev];
        newStates[index] = {
          ...newStates[index],
          error: error.message,
          isLoading: false
        };
        return newStates;
      });
    }
  };

  const handleClick = async () => {
    // Generate responses for all models in parallel
    await Promise.all(
      modelStates.map((state, index) => 
        generateResponse(state.selectedModel, state.apiKey, index)
      )
    );
  };

  return (
    <div>
      <div className="inputDiv">
        <TextareaAutosize
          className="promptInput"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter prompt here"
        />
        <div className="char-counter">
          {charCount} characters
        </div>
      </div>

      <div className="buttonDiv">
        <Button
          size="large"
          variant="contained"
          onClick={handleClick}
          disabled={!inputText.trim()}
        >
          Generate Outputs
        </Button>
      </div>

      <div className="outputDiv">
        {modelStates.map((state, index) => (
          <ModelColumn
            key={index}
            selectedModel={state.selectedModel}
            onModelChange={handleModelChange(index)}
            apiKey={state.apiKey}
            onApiKeyChange={handleApiKeyChange(index)}
            error={state.error}
            isLoading={state.isLoading}
            output={state.output}
          />
        ))}
      </div>
    </div>
  );
}

export default OpenAIComponent;
