const { query } = require('../db');


// Get all carts
const getCarts = () => {
    return query('SELECT * FROM carts ');
};

// Get all carts for a user
const getCartsByUserId = (user_id) => {
    return query('SELECT * FROM carts WHERE user_id = $1', [user_id]);
};

// Get a cart by its ID
const getCartById = (id) => {
    return query('SELECT * FROM carts WHERE id = $1', [id]);
};

// Create a new cart for a user
const createCart = (user_id) => {
    return query('INSERT INTO carts (user_id) VALUES ($1) RETURNING *', [user_id]);
};

// Delete a cart
const deleteCart = (id) => {
    return query('DELETE FROM carts WHERE id =$1 RETURNING *', [id]);
};

module.exports = {
    getCarts,
    getCartsByUserId,
    getCartById,
    createCart,
    deleteCart
}
