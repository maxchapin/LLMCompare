import React, { useState } from "react";
//import { OpenAI } from 'langchain/llms/openai';
import {
  Button,
  Select,
  MenuItem,
  TextareaAutosize,
  Typography,
  TextField,
  Slider,
} from "@mui/material";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import OpenAI from "openai";
import Anthropic from '@anthropic-ai/sdk';

// Import the OpenAI class from the correct pathn
function OpenAIComponent() {
  const [inputText, setInputText] = useState("");
  const [apiOpenAIKey, setOpenAIApiKey] = useState("default");
  const [googleApiKey, setGoogleApiKey] = useState("default");
  const [claudeApiKey, setClaudeApiKey] = useState("default");
  const [selectedModel1, setSelectedModel1] = useState("gpt-4-0125-preview");
  const [selectedModel2, setSelectedModel2] = useState("gpt-3.5-turbo");
  const [selectedModel3, setSelectedModel3] = useState("davinci-002");
  const [output1, setOutput1] = useState("Output will show up here.");
  const [output2, setOutput2] = useState("Output will show up here.");
  const [output3, setOutput3] = useState("Output will show up here.");
  const [temperature, setTemperature] = useState(0);

  //handles prompt changes
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  //handles temperature change
  const handleTemperatureChange = (event, newValue) => {
    setTemperature(newValue);
  };

  //handles openai model change
  const handleModelChange1 = (event) => {
    setSelectedModel1(event.target.value);
  };

  //handles openai api key change
  const handleOpenAIApiKeyChange = (event) => {
    setOpenAIApiKey(event.target.value);
  };

  //handles google model change
  const handleModelChange2 = (event) => {
    setSelectedModel2(event.target.value);
  };

    //handles Calude model change
    const handleModelChange3 = (event) => {
      setSelectedModel3(event.target.value);
    };

  //handles google api key change
  const handleGoogleApiKeyChange = (event) => {
    setGoogleApiKey(event.target.value);
  };

   //handles claude api key change
   const handleClaudeApiKeyChange = (event) => {
    setClaudeApiKey(event.target.value);
  };

  //handles button click
  const handleClick = async () => {
    runOpenAITextToText();
    runGoogle();
    runClaude(inputText, claudeApiKey);
  };

  // const handleProcessInput = async () => {
  //   try {
  //     const response = await axios.post('https://llmcompare.ai/api/process_text_input', {
  //       input: inputText,
  //       key: apiOpenAIKey,
  //       model: selectedModel1,
  //       temperature: temperature,
  //     });

  //     setOutput1(response.data.output);
  //   } catch (error) {
  //     console.error('Error processing input:', error);
  //   }
  // };

  //handles OpenAI API call
  async function runOpenAITextToText() {
    try {
      const openai = new OpenAI({
        apiKey: apiOpenAIKey,
        model: selectedModel1,
        maxTokens: 200,
        temperature: temperature,
        dangerouslyAllowBrowser: true,
      });

      const completion = await openai.chat.completions.create({
        model: selectedModel1, // Corrected the model to use selectedModel1
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant.",
          },
          {
            role: "user",
            content: inputText,
          },
        ],
        temperature: temperature,
      });

      // Check if choices array exists and has items
      if (completion.choices && completion.choices.length > 0) {
        //console.log(completion.choices[0]);
        setOutput1(completion.choices[0].message.content); // Assuming completion.choices[0] contains the response
      } else {
        console.error("No choices returned from OpenAI");
      }
    } catch (error) {
      console.error("Error running OpenAI text-to-text:", error);
    }
  }


  //handles Google API call
  const genAI = new GoogleGenerativeAI(googleApiKey);

  async function runGoogle() {
    const generationConfig = {
      maxOutputTokens: 200,
      temperature: temperature / 2,
    };
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      generationConfig,
    });

    const prompt = inputText;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    setOutput2(text);
    //console.log(text);
  }

  //handles Claude API call
  async function runClaude(inputText, claudeApiKey) {
    try {
      const response = await axios.post('https://prod.llmcompare.vercel.app/api/process_claude/', {
        api_key: claudeApiKey,
        model: 'claude-3-opus-20240229',
        system: inputText,
      });
      console.log("test");

      console.log(response.data.output);
      setOutput3(response.data.output);
      //setOutput3(response.data.message_content);
    } catch (error) {
      console.error('Error:', error);
    }
  }


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

      <div className="sliderDiv">
        <h3>Temperature</h3>
        <Slider
          className="slider"
          //size='small'
          value={temperature}
          onChange={handleTemperatureChange}
          min={0}
          max={2}
          step={0.01}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value.toFixed(2)}`}
          marks={[
            { value: 0, label: "0" },
            { value: 1, label: "1" },
            { value: 2, label: "2" },
          ]}
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
        <div className="selOut">
          <Select
            className="selector"
            defaultValue="gpt-4-0125-preview"
            value={selectedModel1}
            onChange={handleModelChange1}
          >
            <MenuItem value={"gpt-4-0125-preview"}>gpt-4-0125-preview</MenuItem>
            <MenuItem value={"gpt-4-turbo-preview"}>
              gpt-4-turbo-preview
            </MenuItem>
            <MenuItem value={"gpt-4-1106-preview"}>gpt-4-0125-preview</MenuItem>
            <MenuItem value={"gpt-4"}>gpt-4</MenuItem>
            <MenuItem value={"gpt-4-0613"}>gpt-4-0613</MenuItem>
            <MenuItem value={"gpt-4-32k"}>gpt-4-32k</MenuItem>
            <MenuItem value={"gpt-4-32k-0613"}>gpt-4-32k-0613</MenuItem>
            <MenuItem value={"gpt-3.5-turbo-1106"}>gpt-3.5-turbo-1106</MenuItem>
            <MenuItem value={"gpt-3.5-turbo"}>gpt-3.5-turbo</MenuItem>
            <MenuItem value={"gpt-3.5-turbo-16k"}>gpt-3.5-turbo-16k</MenuItem>
            <MenuItem value={"gpt-3.5-turbo-instruct"}>
              gpt-3.5-turbo-instruct
            </MenuItem>
            <MenuItem value={"gpt-3.5-turbo-0613"}>gpt-3.5-turbo-0613</MenuItem>
            <MenuItem value={"gpt-3.5-turbo-16k-0613"}>
              gpt-3.5-turbo-16k-0613
            </MenuItem>
            <MenuItem value={"gpt-3.5-turbo-0301"}>gpt-3.5-turbo-0301</MenuItem>
            <MenuItem value={"babbage-002"}>babbage-002</MenuItem>
            <MenuItem value={"davinci-002"}>davinci-002 </MenuItem>
          </Select>

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

          <Typography className="output" variant="body1" border={1}>
            {output1}
          </Typography>
        </div>

        <div className="selOut">
          <Select
            className="selector"
            defaultValue="gemini-pro"
            onChange={handleModelChange2}
          >
            <MenuItem value={"gemini-pro"}>Gemini Pro</MenuItem>
          </Select>
          <div className="inputKeyDiv">
            <TextField
              className="keyEntry"
              label="Enter Google API key here"
              onChange={handleGoogleApiKeyChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </div>
          <Typography className="output" variant="body1" border={1}>
            {output2}
          </Typography>
        </div>

        <div className="selOut">
          <Select
            className="selector"
            defaultValue="Claude-2.1"
            onChange={handleModelChange2}
          >
            <MenuItem value={"Claude-2.1"}>Claude-2.1</MenuItem>
          </Select>
          <div className="inputKeyDiv">
            <TextField
              className="keyEntry"
              label="Enter Claude API key here"
              onChange={handleClaudeApiKeyChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </div>
          <Typography className="output" variant="body1" border={1}>
            {output3}
          </Typography>
        </div>

        {/*<div className='selOut'>
                <Select className='selector' defaultValue="davinci-002" value={selectedModel3} onChange={handleModelChange3}>
                        <MenuItem value={"gpt-4-0125-preview"}>gpt-4-0125-preview</MenuItem>
                        <MenuItem  value={"gpt-4-turbo-preview"}>gpt-4-turbo-preview</MenuItem>
                        <MenuItem value={"gpt-4-1106-preview"}>gpt-4-0125-preview</MenuItem>
                        <MenuItem value={"gpt-4"}>gpt-4</MenuItem>
                        <MenuItem value={"gpt-4-0613"}>gpt-4-0613</MenuItem>
                        <MenuItem value={"gpt-4-32k"}>gpt-4-32k</MenuItem>
                        <MenuItem value={"gpt-4-32k-0613"}>gpt-4-32k-0613</MenuItem>
                        <MenuItem value={"gpt-3.5-turbo-1106"}>gpt-3.5-turbo-1106</MenuItem>
                        <MenuItem value={"gpt-3.5-turbo"}>gpt-3.5-turbo</MenuItem>
                        <MenuItem value={"gpt-3.5-turbo-16k"}>gpt-3.5-turbo-16k</MenuItem>
                        <MenuItem value={"gpt-3.5-turbo-instruct"}>gpt-3.5-turbo-instruct</MenuItem>
                        <MenuItem value={"gpt-3.5-turbo-0613"}>gpt-3.5-turbo-0613</MenuItem>
                        <MenuItem value={"gpt-3.5-turbo-16k-0613"}>gpt-3.5-turbo-16k-0613</MenuItem>
                        <MenuItem value={"gpt-3.5-turbo-0301"}>gpt-3.5-turbo-0301</MenuItem>
                        <MenuItem value={"babbage-002"}>babbage-002</MenuItem>
                        <MenuItem value={"davinci-002"}>davinci-002	</MenuItem>
                    
                </Select>
                <Typography className='output' variant="body1" border={1}>
                {output3}
                </Typography>
            </div>*/}
      </div>
    </div>
  );
}

export default OpenAIComponent;
