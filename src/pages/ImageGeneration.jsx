import React, { useState } from "react";
import OpenAI from "openai";
import { Button, TextareaAutosize, TextField } from "@mui/material";
import StableDiffusion from "../components/StableDiffusion";
import OpenAITextToImage from "../components/OpenAITextToImage";

function ImageGeneration() {
  const [inputText, setInputText] = useState("");
  const [apiOpenAIKey, setOpenAIApiKey] = useState("your-api-key"); // Replace with your actual API key
  const [apiStableAIKey, setStabelAIKey] = useState("your-api-key");
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleOpenAIApiKeyChange = (event) => {
    setOpenAIApiKey(event.target.value);
  };

  const handleStableAIKeyChange = (event) => {
    setStabelAIKey(event.target.value);
  };

  const handleClick = () => {
    setButtonClicked(true);
  };

  return (
    <div>
      <div className="inputDiv">
        <TextareaAutosize
          className="promptInput"
          value={inputText}
          onChange={handleInputChange}
          multiline
          minRows={5}
          placeholder="Enter prompt here"
        />
      </div>

      <div className="buttonDiv">
        <Button
          size="large"
          className="buttonDiv"
          variant="contained"
          onClick={handleClick}
        >
          Generate Output
        </Button>
      </div>

      <div className="outputDiv">

        <div className="individualImgOutput"> 
          <div className="inputKeyDiv">
            <TextField
              className="keyEntry"
              label="Enter OpenAI API key here"
              onChange={handleOpenAIApiKeyChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </div>

          <div className="imgOutput">
            {buttonClicked && (
              <OpenAITextToImage
                apiKey={apiOpenAIKey}
                input={inputText}
              ></OpenAITextToImage>
            )}
          </div>
        </div>

        <div className="individualImgOutput">
          <div className="inputKeyDiv">
            <TextField
              className="keyEntry"
              label="Enter StableDiffusion API key here"
              onChange={handleStableAIKeyChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </div>
          <div className="imgOutput">
            {buttonClicked && (
              <StableDiffusion
                apiKey={apiStableAIKey}
                input={inputText}
              ></StableDiffusion>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageGeneration;
