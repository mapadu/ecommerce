// price should be fetched from the products stable when adding a product to the cart, not entering manually!!!

const express = require('express');
const router = express.Router();

const {
    getCarts,
    getCartsByUserId,
    getCartById,
    createCart,
    deleteCart
} = require('../queries/carts');

const {
    getCartItems,
    addOrUpdateCartItem,
    updateCartItemQuantity,
    removeCartItem,
    clearCart
} = require('../queries/cart_items');

// ** CART ROUTES **

// GET all carts
router.get('/', async (req, res) => {
    try {
        const result = await getCarts();
        res.json(result.rows);
    } catch (err) {
        console.err(err);
        res.status(500).send('Error fetching carts');
    }
});

// GET all carts for a user
router.get('/user/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params;
        const result = await getCartsByUserId(user_id);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching carts');
    }
});

// GET a cart by id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await getCartById(id);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching the cart');
    }
});

// POST - create a new cart for a user
router.post('/', async (req, res) => {
    try {
        const { user_id } = req.body;
        const result = await createCart(user_id);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating cart')
    }
});

// DELETE a cart by id
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await deleteCart(id);
        res.status(200).send(`Cart with ID ${id} deleted`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting cart');
    }
});

// ** CART_ITEMS ROUTES **

// GET all items in a cart
router.get('/:cart_id/items', async (req, res) => {
    try {
        const { cart_id } = req.params;
        const result = await getCartItems(cart_id);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching cart items');
    }
});

// POST - add or update a cart item
router.post('/:cart_id/items', async (req, res) => {
    try {
        const { cart_id } = req.params;
        const { product_id, quantity, price } = req.body;
        const result = await addOrUpdateCartItem(cart_id, product_id, quantity, price);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding or updating item');
    }
});

// PUT - update the quantity of an item in the cart
router.put('/:cart_id/items/:product_id', async (req, res) => {
    try {
        const { cart_id, product_id } = req.params;
        const { quantity } = req.body;
        const result = await updateCartItemQuantity(cart_id, product_id, quantity);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating cart item quantity');
    }
});

// DELETE - Remove an item from the cart
router.delete('/:cart_id/items/:product_id', async (req, res) => {
    try {
        const { cart_id, product_id } = req.params;
        await removeCartItem(cart_id, product_id);
        res.status(200).send(`Item ${product_id} removed from cart ${cart_id}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error removing item from cart');
    }
});

// DELETE - Remove all item from the cart
router.delete('/:cart_id/clear', async (req, res) => {
    try {
        const { cart_id } = req.params;
        await clearCart(cart_id);
        res.status(200).send(`All item removed from cart ${cart_id}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error clearing cart');
    }
});


module.exports = router;


