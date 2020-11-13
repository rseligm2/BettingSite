import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Components/Home.js';

function App() {
  return (
    <div className="App">
        <Home/>
    </div>
  );
}

export default App;
