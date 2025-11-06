import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// === API ROUTES ===

app.get('/api/weather', async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'City query parameter is required.' });
  }

  const API_KEY = process.env.OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json({ error: error.response.data.message });
    }
    res.status(500).json({ error: 'Error fetching weather data.' });
  }
});

app.get('/api/currency', async (req, res) => {
  const url = 'https://api.exchangerate-api.com/v4/latest/INR';

  try {
    const response = await axios.get(url);
    const rates = response.data.rates;

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

// A list of mock quotes
const mockQuotes = [
  { content: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { content: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { content: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
  { content: "Whoever is happy will make others happy too.", author: "Anne Frank" },
  { content: "Do not let what you cannot do interfere with what you can do.", author: "John Wooden" }
];

/**
 * [GET] /api/quote
 * Fetches a random motivational quote (MOCKED)
 */
app.get('/api/quote', async (req, res) => {
  try {
    const randomQuote = mockQuotes[Math.floor(Math.random() * mockQuotes.length)];
    res.json(randomQuote);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching quote.' });
  }
});

export default app;