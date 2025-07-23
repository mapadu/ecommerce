require('dotenv').config();
const logger = require('./utils/logger');

const { Pool } = require('pg');

const pool = new Pool ({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// DB query with logging and error handling
const query = async (text, params) => {
    if (process.env.NODE_ENV !== 'production') {
        console.log('Executed query:', text, 'with params:', params);
    }
    
    try {
        return await pool.query(text, params);
    } catch (err) {
        logger.error('Database query failed', {
            query: text,
            params,
            error: err.message
        });
        throw err;
    }
};


module.exports = {
    query,
}