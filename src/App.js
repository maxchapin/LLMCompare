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
import Tutorial from './pages/Tutorial';
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
          <Route path="/tutorial" Component={Tutorial} />
        </Routes>
        <Footer/>
      </Router>
      <Analytics></Analytics>
    </div>
  );
}

export default App;
