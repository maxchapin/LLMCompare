import React from "react";
import { Link } from 'react-router-dom';

function Footer() {

    return(

        <div>
            <div className="footer">
            
                <Link to='./' className='logo'>
                    <h4>Home</h4>
                </Link> 

                <Link to='./PrivacyPolicy' className='logo'>
                    <h4>Privacy Policy</h4>
                </Link> 

            </div>

            <p className="copyright">Copyright LLMCompare.ai 2024</p>

        </div>
    );
    
    
};

export default Footer;