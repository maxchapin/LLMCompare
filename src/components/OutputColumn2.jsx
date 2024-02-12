import React, {useState} from "react";
import { useEffect } from "react";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Option } from '@mui/base/Option';
import Typography from '@mui/material/Typography';
import { OpenAI } from "langchain/llms/openai";


function OutputColumn({ passedApiKey, prompt }){
    //console.log(props)
    const [apiKey, setApiKey] = useState("default");
    const [dropdown, setDropdown] = useState('default');
    const [output1, setOutput1] = useState("Output will show up here")
    setOutput1("Please wait...");

   
      useEffect(() => {
        setApiKey('default');
      }, [passedApiKey, "default"]);

    const handleChange = (event) => {
        setDropdown(event.target.value);
        console.log(event.target.value);
    }
    
    //setApiKey(props.apiKey)

    const llm1 = new OpenAI({
        
        openAIApiKey: apiKey,
        model: dropdown,
        temperature: 0
      });

      let res1 =  llm1.invoke(prompt);
      res1.then(setOutput1);
   
    return (
        <div>

            <Select className="selector" onChange={handleChange} defaultValue={"gpt-4-0125-preview"} Selection={dropdown}> 
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

            <Typography className="output" variant="body1" border={1}>{output1}</Typography>    
        </div>

        
    );



}

export default OutputColumn;