import React, {useState} from "react";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Option } from '@mui/base/Option';

function OutputColumn(){

   
    return (

        <Select className="selector" defaultValue={"gpt-4-0125-preview"}> 
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
    );



}

export default OutputColumn;