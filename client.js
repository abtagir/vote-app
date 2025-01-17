const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.static('public'));
app.use(express.json());

const SERVER_URL = 'http://vote-server.default.svc.cluster.local:5000';

app.post('/vote', async (req, res) => {
  try {
    const response = await axios.post(`${SERVER_URL}/vote`, req.body);
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { error: 'Internal server error' });
  }
});

app.get('/results', async (req, res) => {
  try {
    const response = await axios.get(`${SERVER_URL}/results`);
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { error: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log('Client is running on port 3000');
});
