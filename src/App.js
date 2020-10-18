import React from 'react';
import logo from './logo.svg';
import './App.css';
import Topmenu from './Components/Topmenu'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
        <Topmenu/>
    </div>
  );
}

export default App;
