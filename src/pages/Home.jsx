import React, {useState} from "react";
import Button from '@mui/material/Button';
import { Input } from '@mui/base/Input';
import Typography from '@mui/material/Typography';
import { OpenAI } from "langchain/llms/openai";


const llm = new OpenAI({
    openAIApiKey: "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",
    model: "gpt-3.5-turbo",
    temperature: 0
  });
  


function Home(){
    const [input, setInput] = useState("Tell me a corny joke.");
    const [output, setOutput] = useState("Output")


    function  handleClick(){
        console.log(input);

        setOutput("Please wait...")
        let res =  llm.invoke(input);
        res.then(setOutput);
        console.log(res)
        


    }

    return(
        <div>  
            <p>LLM Compare</p>
            
            <Input onChange={(newValue) => setInput(newValue.target.value) } multiline placeholder="Enter Prompt Here"/>
            <Button variant="text" onClick={handleClick}>Enter</Button>
            <Typography variant="body1" border={1}>{output}</Typography>

        </div>
    );
};

export default Home;