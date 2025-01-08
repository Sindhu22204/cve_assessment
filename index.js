const express = require('express');
const cors = require('cors'); 
const sequelize = require('./config/database');  // Import the Sequelize instance
const CveDetails = require('./model/cveDetails');  // Import the model
app.use(cors());
const app = express();
app.use(express.json());  // Ensure that the body is parsed as JSON

// Fetch all CVEs
app.get('/cves', async (req, res) => {
    try {
        const cves = await CveDetails.findAll();  // Fetch data using Sequelize
        console.log("Fetched CVEs:", cves);  // Debug log
        res.json(cves);  // Send JSON response
    } catch (error) {
        console.error('Error fetching CVEs:', error);  // Log the detailed error
        res.status(500).json({ error: 'An error occurred while fetching CVEs', details: error.message });
    }
});

// Pagination (assuming 10 CVEs per page)
app.get('/cves/page/:page', async (req, res) => {
    const { page } = req.params;
    const limit = 10;
    const offset = (page - 1) * limit;

    try {
        const cves = await CveDetails.findAll({
            limit: limit,
            offset: offset
        });

        console.log("Fetched paginated CVEs:", cves);  // Debug log
        res.json(cves);  // Send JSON response
    } catch (error) {
        console.error('Error fetching paginated CVEs:', error);  // Log the detailed error
        res.status(500).json({ error: 'An error occurred while fetching paginated CVEs', details: error.message });
    }
});

sequelize.sync()  // This will automatically create or alter the table based on the model definition
    .then(() => {
        console.log("Database synced successfully.");
    })
    .catch((error) => {
        console.error("Error syncing the database:", error);
    });

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
