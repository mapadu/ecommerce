const express = require('express');
const session = require('express-session');
const passport = require('./middleware/auth');
const app = express();
const userRoutes = require('./routes/users');
const PORT = 3000;
require('dotenv').config();

app.use(express.json()); // Middleware for parsing JSON req bodies

// root
app.get('/', (req, res) => {
    res.send('Hello, this is an ecommerce server');
});

// Setup Express-session middleware to manage user sessions
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// Initialize Passport middleware (for authentication handling)
app.use(passport.initialize());

// Enable Passport middleware to use session-based authentication (combine the passport middleware and express-session)
app.use(passport.session());

// Attaching routes to the app
app.use('/users', userRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});