const express = require('express');
const router = express.Router();
const pool = require('../utils/db'); 
const schoolController = require('../controllers/schoolController');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM schools");
    res.json({ 
      message: "Welcome to the School Management API", 
      schools: result.rows 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/addSchool', schoolController.addSchool);
router.get('/listSchools', schoolController.listSchools);

module.exports = router;