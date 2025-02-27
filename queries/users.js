const { query } = require('../db');

// Get all users
const getUsers = () => {
    return query('SELECT * FROM users')
}

// Get a specific user by id
const getUserById = (id) => {
    return query ('SELECT * FROM users WHERE id = $1', [id]);
};

// Add a new user
const addUser = (id, name, email, password) => {
    return query(
        'INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
        [id, name, email, password]
    );
};

// Update user info
const updateUser = (id, name, email, password) => {
    return query(
        'UPDATE users SET name = $1,email = $2, password = $3 WHERE id = $4 RETURNING *',
        [name, email, password, id]
    );
};

// Delete a user
const deleteUser = (id) => {
    return query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
};

module.exports = {
    getUsers,
    addUser,
    updateUser,
    deleteUser
};