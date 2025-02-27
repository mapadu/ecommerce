const express = require('express');
const router = express.Router();
const { getUsers, addUser, getUserById, updateUser, deleteUser } = require('../queries/users');

// GET all users
router.get('/', async (req, res) => {
    try {
        const result = await getUsers();
        res.json(result.rows);
    } catch (err) {
        console.err(err);
        res.status(500).send('Error fetching users');
    }
});

// GET a user by id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await getUserById(id);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching user');
    }
});

// POST a new user
router.post('/', async (req, res) => {
    const { id, name, email, password } = req.body;
    try {
        const result = await addUser(id, name, email, password);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating user')
    }
});

// PUT - Update a user by id
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        const result = await updateUser(id, name, email, password);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating user');
    }
});

// DELETE a user by id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await deleteUser(id);
        res.status(200).send(`User with ID ${id} deleted`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting user')
    }
});

module.exports = router;