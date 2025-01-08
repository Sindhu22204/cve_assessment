const axios = require('axios');
const db = require('./db');

const BASE_URL = 'https://services.nvd.nist.gov/rest/json/cves/2.0';

async function fetchCVEData(startIndex = 0, resultsPerPage = 10) {
    try {
        const response = await axios.get(BASE_URL, {
            params: { startIndex, resultsPerPage }
        });

        console.log("Sample CVE Object:", response.data.vulnerabilities[0]?.cve); // For debugging

        const cves = response.data.vulnerabilities;
        const sql = `
            INSERT INTO cve_details (cve_id, description, base_score_v2, base_score_v3, published_date, last_modified_date)
            VALUES (?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                description = VALUES(description),
                base_score_v2 = VALUES(base_score_v2),
                base_score_v3 = VALUES(base_score_v3),
                published_date = VALUES(published_date),
                last_modified_date = VALUES(last_modified_date);
        `;

        for (const vulnerability of cves) {
            const details = vulnerability.cve;
            const cveId = details.id;
            const description = details.descriptions?.[0]?.value || "No description available";
            const baseScoreV2 = details.metrics?.cvssMetricV2?.[0]?.cvssData?.baseScore || null;
            const baseScoreV3 = details.metrics?.cvssMetricV3?.[0]?.cvssData?.baseScore || null;
            const publishedDate = details.published || null;
            const lastModifiedDate = details.lastModified || null;

            await db.promise().query(sql, [
                cveId, description, baseScoreV2, baseScoreV3, publishedDate, lastModifiedDate
            ]);
        }

        console.log("Data fetched and stored successfully!");
    } catch (error) {
        console.error("Error fetching CVE data:", error.message);
    }
}

fetchCVEData();
