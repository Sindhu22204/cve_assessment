const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Import the sequelize instance

const CveDetails = sequelize.define('CveDetails', {
  cve_id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  base_score_v2: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  base_score_v3: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  published_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  last_modified_date: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'cve_details',
  timestamps: false
});

module.exports = CveDetails;
