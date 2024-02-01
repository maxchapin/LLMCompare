import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import PrivacyPolicy from './pages/PPolicy';

function App() {
  return (
    
    <Router>  
          <Routes>       
              <Route exact path="/" Component={Home} />
              <Route path="/Home" Component={Home} />
              <Route path="/PrivacyPolicy" Component={PrivacyPolicy} />
              {/* Add more routes if you have other pages */}
          </Routes>
      </Router>
  );
}

export default App;
