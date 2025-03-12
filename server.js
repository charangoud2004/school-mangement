const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connection = require("./src/utils/db"); 
const schoolRoutes = require("./src/routes/schoolRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/", schoolRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});