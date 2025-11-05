import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON bodies

// === API ROUTES ===

/**
 * [GET] /api/weather
 * Fetches weather data for a specific city.
 * Query Param: ?city=<city_name>
 */
app.get('/api/weather', async (req, res) => {
  const { city } = req.query;

  // Gracefully handle bad input
  if (!city) {
    return res.status(400).json({ error: 'City query parameter is required.' });
  }

  const API_KEY = process.env.OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    // Handle errors from the external API (e.g., city not found)
    if (error.response) {
      return res.status(error.response.status).json({ error: error.response.data.message });
    }
    res.status(500).json({ error: 'Error fetching weather data.' });
  }
});

/**
 * [GET] /api/currency
 * Fetches currency conversion rates for INR to USD and EUR.
 */
app.get('/api/currency', async (req, res) => {
  // Using a free, no-key-required API
  const url = 'https://api.exchangerate-api.com/v4/latest/INR';

  try {
    const response = await axios.get(url);
    const rates = response.data.rates;

    // Filter to send only the required rates
    const requiredRates = {
      USD: rates.USD,
      EUR: rates.EUR,
      base: 'INR',
      last_updated: response.data.time_last_updated,
    };
    res.json(requiredRates);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching currency data.' });
  }
});

/**
 * [GET] /api/quote
 * Fetches a random motivational quote.
 */
app.get('/api/quote', async (req, res) => {
  // Using a free, no-key-required API
  const url = 'https://api.quotable.io/random?tags=motivation|inspiration';

  try {
    const response = await axios.get(url);
    const quote = {
      content: response.data.content,
      author: response.data.author,
    };
    res.json(quote);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching quote.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});