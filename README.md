# CVE Assessment Project

## Overview

The CVE Assessment Project retrieves CVE (Common Vulnerabilities and Exposures) data from the NVD API, stores it in a MySQL database, and provides APIs for fetching and filtering this data. It also includes a basic frontend for viewing CVE details.

---

## Features

- Fetch CVE data from the NVD API and store it in MySQL.
- Provide APIs for:
  - Fetching all CVEs.
  - Filtering CVEs by ID, year, score, or modified date.
  - Pagination for large datasets.
- A simple frontend for viewing CVE data in a table.
- Handles missing/null data gracefully.

---

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **ORM**: Sequelize
- **Frontend**: HTML, CSS, JavaScript
- **API**: NVD API (https://services.nvd.nist.gov/rest/json/cves/2.0)

---

## How to Run the Project

### Prerequisites

- Node.js installed on your system.
- MySQL installed and running.
- Git installed for version control.

### Steps

1. Clone the repository:
   ```bash
   git clone <https://github.com/Sindhu22204/cve_assessment>
   cd cve-assessment
   ```
