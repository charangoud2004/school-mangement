const express = require("express");
require("dotenv").config();

const connection = require("./src/utils/db");
const schoolRoutes = require("./src/routes/schoolRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/schools", schoolRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
