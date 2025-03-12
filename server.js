const express = require("express");
require("dotenv").config();

const connection = require("./src/utils/db");
const schoolRoutes = require("./src/routes/schoolRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/", schoolRoutes);

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
