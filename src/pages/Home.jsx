import React, { useState } from 'react';
import { OpenAI } from 'langchain/llms/openai';
import { Button, Select, MenuItem, TextareaAutosize, Typography, TextField } from '@mui/material';


// Import the OpenAI class from the correct pathn
function OpenAIComponent() {
  const [inputText, setInputText] = useState('');
  const [apiKey, setApiKey] = useState('default');
  const [selectedModel1, setSelectedModel1] = useState("gpt-4-0125-preview");
  const [selectedModel2, setSelectedModel2] = useState("gpt-3.5-turbo");
  const [selectedModel3, setSelectedModel3] = useState("davinci-002");
  const [output1, setOutput1] = useState("Output will show up here.");
  const [output2, setOutput2] = useState("Output will show up here.");
  const [output3, setOutput3] = useState("Output will show up here.");
  
 
  const openai1 = new OpenAI({ openAIApiKey: apiKey, model: selectedModel1, maxTokens:200});
  const openai2 = new OpenAI({ openAIApiKey: apiKey, model: selectedModel2, maxTokens:200});
  const openai3 = new OpenAI({ openAIApiKey: apiKey, model: selectedModel3, maxTokens:200});

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleModelChange1 = (event) => {
    setSelectedModel1(event.target.value);
  };

  const handleModelChange2 = (event) => {
    setSelectedModel2(event.target.value);
  };

  const handleModelChange3 = (event) => {
    setSelectedModel3(event.target.value);
  };

  const handleApiKeyChange = (event) => {
    setApiKey(event.target.value);
  };

  const handleGenerate = async () => {
    try {
      const response1 = await openai1.invoke(
       inputText,
      );
      //JSON.stringify(response1);
      console.log(response1); // Log the response to inspect its structure
      setOutput1(response1);

    //   const res1 = llm1.invoke(input);
    //   console.log(res1)
    //   res1.then(setOutput1);
  
      const response2 = await openai2.invoke(
        inputText,
        // other options like temperature, max tokens, etc.
      );
      console.log(response2); // Log the response to inspect its structure
      setOutput2(response2);
  
      const response3 = await openai3.invoke(
        inputText,
        // other options like temperature, max tokens, etc.
      );
      console.log(response3); // Log the response to inspect its structure
      setOutput3(response3);
    } catch (error) {
      console.error('Error making OpenAI API call:', error);
      setOutput1('Error occurred while making the API call.');
      setOutput2('Error occurred while making the API call.');
      setOutput3('Error occurred while making the API call.');
    }
  };
  

  return (
    <div>

      <div  className='inputDiv'>
        <TextareaAutosize
          className='promptInput'
          
          value={inputText}
          onChange={handleInputChange}
          multiline
          minRows={5}
          placeholder="Enter prompt here"
        />
      </div>

      <div className='inputKeyDiv'>
        <TextField
          className=''
          label="Enter OpenAI API key here"
          onChange={handleApiKeyChange}
          fullWidth
          variant="outlined"
          margin="normal"
        />
      </div>

      <div className='buttonDiv'>
        <Button className='buttonDiv' variant="outlined" onClick={handleGenerate}>
          Generate Output
        </Button>
      </div>

        <div className='outputDiv'>

            
            <div className='selOut'>
                <Select  className='selector'  defaultValue="gpt-4-0125-preview"  value={selectedModel1} onChange={handleModelChange1}>
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
                {output1}
                </Typography>
            </div>

            <div className='selOut'>
                <Select  className='selector' defaultValue="gpt-3.5-turbo" value={selectedModel2} onChange={handleModelChange2}>
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
                {output2}
                </Typography>
            </div>

            <div className='selOut'>
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
            </div>
      </div>
      
    </div>
  );
}

export default OpenAIComponent;
