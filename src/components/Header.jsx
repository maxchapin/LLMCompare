import React from "react";
import { Link } from 'react-router-dom';

function Header() {

    return(
        <div>
            <div>
                <Link to='./' className='logo'>
                    <h1>LLMCompare.ai</h1>
                </Link> 
            </div>
            

            <div className="pageLinks">
                <Link to='./' className='pageLinkText'>
                    <h1>Text-to-Text</h1>
                </Link> 

                <Link to='./ImageGeneration' className='pageLinkText'>
                    <h1>Text-to-Image</h1>
                </Link> 
            </div>


        </div>
    );
    
    
};

export default Header;