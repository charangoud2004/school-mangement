const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController');

router.get("/", (req, res) => {
    res.send("Welcome to the School Management API");
    res.json({ message: "Server is working" });
});

router.post('/addSchool', schoolController.addSchool);
router.get('/listSchools', schoolController.listSchools);

module.exports = router;