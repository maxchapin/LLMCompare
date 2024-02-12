import React from "react";
import { Link } from 'react-router-dom';

function Header() {

    return(
        <div>
        
            <Link to='./' className='logo'>
                <h1>LLMCompare.ai</h1>
            </Link> 
        </div>
    );
    
    
};

export default Header;