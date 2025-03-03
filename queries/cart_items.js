const { query } = require('../db');

// Get all items in a cart
const getCartItems = (id) => {
    return query('SELECT * FROM cart_items WHERE cart_id = $1', [id]);
};

// Adding or updating a cart item
const addOrUpdateCartItem = async (cart_id, product_id, quantity, price) => {

    // Checking that the item is already in cart. if it is, UPDATE quantity
    const existingItem = await query(
        'SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2',
        [cart_id, product_id]
    );
    
    if (existingItem.rows.length > 0) {
        return query(
            'UPDATE cart_items SET quantity = quantity + $1 WHERE cart_id = $2 AND product_id = $3 RETURNING *',
            [quantity, cart_id, product_id]
        )
    // if it isn't, INSERT new row
    } else {
        return query (
            'INSERT INTO cart_items (cart_id, product_id, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *',
            [cart_id, product_id, quantity, price]
        );
    }
};

// Update item quantity
const updateCartItemQuantity = (cart_id, product_id, quantity) => {
    return query(
        'UPDATE cart_items SET quantity = $1 WHERE cart_id = $2 AND product_id = $3 RETURNING *',
        [quantity, cart_id, product_id]
    );
};

// Remove an item from the cart
const removeCartItem = (cart_id, product_id) => {
    return query(
        'DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2 RETURNING *',
        [cart_id, product_id]
    );
};

// Clear all items from a cart
const clearCart = (cart_id) => {
    return query('DELETE FROM cart_items WHERE cart_id = $1 RETURNING *', [cart_id]);
};

module.exports = {
    getCartItems,
    addOrUpdateCartItem,
    updateCartItemQuantity,
    removeCartItem,
    clearCart
}