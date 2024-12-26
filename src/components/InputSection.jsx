import React from 'react';
import { TextareaAutosize } from '@mui/material';

const InputSection = ({ inputText, handleInputChange, charCount }) => {
  return (
    <div className="inputDiv">
      <TextareaAutosize
        className="promptInput"
        value={inputText}
        onChange={handleInputChange}
        minRows={5}
        placeholder="Enter prompt here"
      />
      <div className="char-counter">
        {charCount} characters
      </div>
    </div>
  );
};

export default InputSection; 