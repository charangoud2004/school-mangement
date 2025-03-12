const pool = require("../utils/db");

exports.addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const query = `
            INSERT INTO schools (name, address, latitude, longitude)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
    const result = await pool.query(query, [
      name,
      address,
      latitude,
      longitude,
    ]);
    res
      .status(201)
      .json({ message: "School added successfully", school: result.rows[0] });
  } catch (error) {
    console.error("Error adding school:", error);
    res
      .status(500)
      .json({ message: "Error adding school", error: error.message });
  }
};

exports.listSchools = async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ message: "Latitude and longitude are required" });
  }

  try {
    const query = `
            SELECT *, 
            (6371 * acos(
                cos(radians($1::float)) * cos(radians(latitude::float)) * 
                cos(radians(longitude::float) - radians($2::float)) + 
                sin(radians($1::float)) * sin(radians(latitude::float))
            ) AS distance 
            FROM schools 
            ORDER BY distance;
        `;
    const result = await pool.query(query, [latitude, longitude]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching schools:", error);
    res
      .status(500)
      .json({ message: "Error fetching schools", error: error.message });
  }
};

