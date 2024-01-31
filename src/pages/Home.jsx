import React, {useState} from "react";
import { Button } from '@mui/base/Button';
import { Input } from '@mui/base/Input';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import Typography from '@mui/material/Typography';
import { OpenAI } from "langchain/llms/openai";
import OutputColumn from "../components/OutputColumn";



  
function Home(){
    const [input, setInput] = useState("Tell me a corny joke.");
    const [apiKey, setApiKey] = useState("default");
    const [output1, setOutput1] = useState("Output will show up here")
    const [output2, setOutput2] = useState("Output will show up here")
    const [output3, setOutput3] = useState("Output will show up here")
    const [dropdown1, setDropdown1] = useState('default');
    const [dropdown2, setDropdown2] = useState('default');
    const [dropdown3, setDropdown3] = useState('default');

    function  handleClick(){
        console.log(input);
        //console.log(apiKey);

        setOutput1("Please wait...");
        setOutput2("Please wait...");
        setOutput3("Please wait...");
        let res1 =  llm1.invoke(input);
        let res2 =  llm2.invoke(input);
        let res3 =  llm3.invoke(input);
        res1.then(setOutput1);
        res2.then(setOutput2);
        res3.then(setOutput3);
        //console.log(res)
    }

    const llm1 = new OpenAI({
        openAIApiKey: apiKey,
        model: dropdown1,
        temperature: 0
      });
    
      const llm2 = new OpenAI({
        openAIApiKey: apiKey,
        model: dropdown2,
        temperature: 0
      });
    
      const llm3 = new OpenAI({
        openAIApiKey: apiKey,
        model: dropdown3,
        temperature: 0
    
      });

      const handleChangeD1 = (event) => {
          setDropdown1(event.target.value);
      }

      const handleChangeD2 = (event) => {
        setDropdown2(event.target.value);
      }

     const handleChangeD3 = (event) => {
        setDropdown3(event.target.value);
     }
  

    return(
        <div>  
            <h1>LLM Compare</h1>
            
            <div className="inputDiv">
                <TextareaAutosize className="promptInput" onChange={(newValue) => setInput(newValue.target.value) } multiline minRows={5}  placeholder="Enter prompt here"/>
            </div>

            <div className="inputKeyDiv">
                <TextareaAutosize className="apiKeyInput" onChange={(newValue) => setApiKey(newValue.target.value) } maxRows={1} placeholder="Enter Open APIKey Here (I promise we won't steal it)"/>
            </div>

            <div className="buttonDiv">
                <Button  className="enterButton" variant="text" onClick={handleClick} style={{justifyContent: 'center'}}>Enter</Button>
            </div>

            <div className="outputDiv">
                <div className="selOut"> 
                    <OutputColumn onChange={handleChangeD1}></OutputColumn>
                    <Typography className="output" variant="body1" border={1}>{output1}</Typography>
                </div>

                <div className="selOut">
                    <OutputColumn onChange={handleChangeD2}></OutputColumn>
                    <Typography className="output" variant="body1" border={1}>{output2}</Typography>
                </div>

                <div className="selOut">
                    <OutputColumn onChange={handleChangeD3}></OutputColumn>
                    <Typography className="output" variant="body1" border={1}>{output3}</Typography>
                </div>
            </div>

        </div>
    );
};

export default Home;