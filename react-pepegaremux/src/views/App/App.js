import React from 'react';
import Top from '../../components/top/Top';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Top/>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;