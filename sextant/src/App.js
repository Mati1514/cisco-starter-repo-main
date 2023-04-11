import React from 'react';
import './App.css';

function Banner() {
  return (
    <div className="banner">
      <div className="banner-overlay">
        <div className="banner-content">
          <h1>SEXTANT</h1>
          <p>cisco</p>
        </div>
      </div>
    </div>
  );
}

function Exhibit({ title, children }) {
  return (
    <div className="exhibit">
      <h2 className="exhibit-title">{title}</h2>
      <div className="exhibit-content">
        {children}
      </div>
    </div>
  );
}


function App() {
  return (
    <div className="App">
      <Banner />        
      <Exhibit title="Example Exhibit">
        <p>Child component 1</p>
        <p>Child component 2</p>
        <p>Child component 3</p>
      </Exhibit>
    </div>
  );
}

export default App;
