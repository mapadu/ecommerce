const express = require('express');
const app = express();
const userRoutes = require('./routes/users');
const PORT = 3000;

app.use(express.json()); // Middleware for parsing JSON req bodies

// root
app.get('/', (req, res) => {
    res.send('Hello, this is an ecommerce server');
});

// Attaching routes to the app
app.use('/users', userRoutes);




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});