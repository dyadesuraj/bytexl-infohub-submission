import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function Currency() {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`${API_URL}/api/currency`);
        setRates(response.data);
      } catch (err) {
        setError('Failed to fetch currency rates.');
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []); // Runs once on component mount

  return (
    <div className="module">
      <h2>Currency Conversion (from INR)</h2>
      
      {loading && <div className="loader">Loading rates...</div>}
      {error && <div className="error-message">{error}</div>}

      {rates && (
        <div className="module-content currency-result">
          <h3>1 INR =</h3>
          <p className="rate"><span>{rates.USD.toFixed(6)}</span> USD</p>
          <p className="rate"><span>{rates.EUR.toFixed(6)}</span> EUR</p>
          <small>
            Last Updated: {new Date(rates.last_updated * 1000).toLocaleString()}
          </small>
        </div>
      )}
    </div>
  );
}

export default Currency;