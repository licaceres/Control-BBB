import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Home/>
    </BrowserRouter>
  );
}

export default App;
