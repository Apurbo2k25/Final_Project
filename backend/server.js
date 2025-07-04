const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for your frontend domain
app.use(cors({
  origin: 'https://quizify2025.netlify.app'
}));

app.get('/api/questions', async (req, res) => {
  const { category, difficulty } = req.query;

  try {
    let url = `https://opentdb.com/api.php?amount=5&type=multiple`;
    if (category) url += `&category=${category}`;
    if (difficulty) url += `&difficulty=${difficulty}`;

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("API Fetch Error:", error.message);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
