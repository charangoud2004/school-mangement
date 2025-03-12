const express = require("express");
const pool = require("./src/utils/db");
require("dotenv").config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send(
    "Welcome to the School Management API! Use /addSchool to add a school and /listSchools to retrieve schools."
  );
});

app.post("/addSchool", async (req, res) => {
  const { name, address, latitude, longitude } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, address, latitude, longitude]
    );
    res.json({ success: true, school: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get("/listSchools", async (req, res) => {
  const { latitude, longitude } = req.query;
  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ error: "Latitude and Longitude are required" });
  }

  try {
    const result = await pool.query("SELECT * FROM schools");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
