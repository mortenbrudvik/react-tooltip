import React from 'react';
import './App.css';
import {Tooltip} from "./components";

function App() {
  return (
    <div className="App">
      
        
        <Tooltip label='Knowledge is power." – Francis Bacon'>
            <button style={{padding: '10px', border: ' 1px solid grey', borderRadius: '4px'}}>Hover over me!</button>
        </Tooltip>
   
    </div>
  );
}

export default App;
