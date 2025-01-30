import logo from './logo.svg';
import './App.css';
import Welcome from './Component/Welcome.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Component/Home.js';
import Login from './Component/Login.js';

function App() {
  return (
      <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
      
    // </div>
  );
}

export default App;
