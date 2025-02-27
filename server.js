const express = require('express');
const app = express();
const PORT = 3000;
const { query } = require('./db');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, this is an ecommerce server');
});

app.get('/users', async (req,res) => {
    try {
        const result = await query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching users.')
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});