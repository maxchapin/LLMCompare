import './App.css';
import Home from './pages/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import PrivacyPolicy from './pages/PPolicy';
import Header from './components/Header';
import Footer from './components/Footer';
import ImageGeneration from './pages/ImageGeneration';
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <div>
      <Router>  
            <Header/>
            <Routes>       
                <Route exact path="/" Component={Home} />
                <Route path="/Home" Component={Home} />
                <Route path="/PrivacyPolicy" Component={PrivacyPolicy} />
                <Route path="/ImageGeneration" Component={ImageGeneration} />
                {/* Add more routes if you have other pages */}
            </Routes>
            <Footer/>
        </Router>
        <Analytics></Analytics>
      </div>
  );
}

export default App;
