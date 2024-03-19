import React, { useState } from "react";
import OpenAI from "openai";
import { Button, TextareaAutosize, TextField } from "@mui/material";
import axios from 'axios';
import StableDiffusion from "../components/StableDiffusion";

function ImageGeneration() {
  const [inputText, setInputText] = useState('');
  const [apiOpenAIKey, setOpenAIApiKey] = useState('your-api-key'); // Replace with your actual API key
  const [apiStableAIKey, setStabelAIKey] = useState('your-api-key');
  const [image_url, setImageURL] = useState('');
  const [image2_url, setImage2URL] = useState('');

  const openai = new OpenAI({ apiKey: apiOpenAIKey, language: "en" , dangerouslyAllowBrowser: true});

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleOpenAIApiKeyChange = (event) => {
    setOpenAIApiKey(event.target.value);
  };

  const handleStableAIKeyChange = (event) => {
    setStabelAIKey(event.target.value);
  };

  const handleClick = async () => {
    handleProcessInput();
  };

  // const handleProcessInput = async () => {
  //   try {
  //     const response = await axios.post('https://llmcompare.ai/api/process_image_input/', {
  //       input: inputText,
  //       key: apiOpenAIKey,
  //       //model: selectedModel1,
  //       //temperature: temperature,
  //     });

  //     setImageURL(response.data.output);
  //   } catch (error) {
  //     console.error('Error processing input:', error);
  //   }

    const handleProcessInput = async () => {
      try {
        const response = await axios.post(
          'https://llmcompare.ai/api/process_image_input/',
          {
            input: inputText,
            key: apiOpenAIKey, // Include the 'key' field if necessary
            // Remove any other non-simple request fields
          },
          {
            // Add the appropriate Content-Type header
            headers: {
              'Content-Type': 'application/json', // Ensure Content-Type is one of the allowed types
              // Avoid setting any custom headers other than the ones allowed by CORS
            },
          }
        );
    
        setImageURL(data.output && data.output.length > 0 ? data.output[0] : '');
      } catch (error) {
        console.error('Error processing input:', error);
      }
    };

    

    // try {
    //   const data = await axios.post('http://localhost:8000/api/process_stablefusion/', {
    //     input: inputText,
    //     key: apiStableAIKey,
    //     //model: selectedModel1,
    //     //temperature: temperature,
    //   });

    //   setImage2URL(data.output && data.output.length > 0 ? data.output[0] : '');
    // } catch (error) {
    //   console.error('Error processing input:', error);
    // }

 // };

  return (
    <div>
      <div className='inputDiv'>
        <TextareaAutosize
          className='promptInput'
          value={inputText}
          onChange={handleInputChange}
          multiline
          minRows={5}
          placeholder="Enter prompt here"
        />
      </div>

      <div className='buttonDiv'>
        <Button size='large' className='buttonDiv' variant="contained" onClick={handleClick}>
          Generate Output
        </Button>
      </div>

     

      

      <div className="outputDiv">

        <div className="imgOutput">
          <div className='inputKeyDiv'>
            <TextField
              className='keyEntry'
              label="Enter OpenAI API key here"
              onChange={handleOpenAIApiKeyChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </div>

          {image_url && <img src={image_url} alt="Generated Image" />}
        </div>

      
        <div className="imgOutput">
          <div className='inputKeyDiv'>
            <TextField
              className='keyEntry'
              label="Enter Stable Diffusion API key here"
              onChange={handleStableAIKeyChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </div>
          {/*{image2_url && <img src={`data:image/png;base64,${image2_url}`} alt="Generated Image" />} */}
          <StableDiffusion apiKey={apiStableAIKey} input={inputText} ></StableDiffusion>
        </div>


          
      </div>

      
    </div>
  );
}

export default ImageGeneration;
