import React, { useState } from 'react';
import Weather from './components/Weather';
import Currency from './components/Currency';
import Quote from './components/Quote';
import './App.css';

function App() {
  // State to manage which tab is active
  const [activeTab, setActiveTab] = useState('weather');

  const renderComponent = () => {
    switch (activeTab) {
      case 'weather':
        return <Weather />;
      case 'currency':
        return <Currency />;
      case 'quote':
        return <Quote />;
      default:
        return <Weather />;
    }
  };

  return (
    <div className="App">
      <header>
        <h1>ByteXL InfoHub</h1>
        <nav>
          <button
            onClick={() => setActiveTab('weather')}
            className={activeTab === 'weather' ? 'active' : ''}
          >
            Weather
          </button>
          <button
            onClick={() => setActiveTab('currency')}
            className={activeTab === 'currency' ? 'active' : ''}
          >
            Currency
          </button>
          <button
            onClick={() => setActiveTab('quote')}
            className={activeTab === 'quote' ? 'active' : ''}
          >
            Quote
          </button>
        </nav>
      </header>
      <main className="module-container">
        {renderComponent()}
      </main>
    </div>
  );
}

export default App;