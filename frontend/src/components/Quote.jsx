import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Quote() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchQuote = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('/api/quote');
      setQuote(response.data);
    } catch (err) {
      setError('Failed to fetch a quote.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote(); // Fetch a quote when the component first loads
  }, []);

  return (
    <div className="module">
      <h2>Motivational Quote</h2>
      
      {loading && <div className="loader">Loading quote...</div>}
      {error && <div className="error-message">{error}</div>}

      {quote && (
        <div className="module-content quote-result">
          <blockquote className="quote-text">
            "{quote.content}"
          </blockquote>
          <p className="quote-author">- {quote.author}</p>
        </div>
      )}

      <button onClick={fetchQuote} disabled={loading} className="new-quote-btn">
        {loading ? 'Loading...' : 'Get New Quote'}
      </button>
    </div>
  );
}

export default Quote;