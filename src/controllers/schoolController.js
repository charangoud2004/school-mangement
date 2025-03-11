const connection = require('../utils/db');

exports.addSchool = (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    connection.query(query, [name, address, latitude, longitude], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error adding school', error: err });
        }
        res.status(201).json({ message: 'School added successfully', schoolId: results.insertId });
    });
};

exports.listSchools = (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ message: 'Latitude and longitude are required' });
    }

    const query = 'SELECT *, (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) AS distance FROM schools ORDER BY distance';
    connection.query(query, [latitude, longitude, latitude], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching schools', error: err });
        }
        res.status(200).json(results);
    });
};