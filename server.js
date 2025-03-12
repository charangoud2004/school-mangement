const express = require('express');
const pool = require('./db'); 
require('dotenv').config();

const app = express();
app.use(express.json());

app.get('/listSchools', async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    const schools = await pool.query('SELECT * FROM schools');
    res.json(schools.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
