import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Currency() {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      setError('');
      try {
        // Uses the hardcoded relative path
        const response = await axios.get('/api/currency');
        setRates(response.data);
      } catch (err) {
        setError('Failed to fetch currency rates.');
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

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