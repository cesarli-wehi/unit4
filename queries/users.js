const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

/**
 * Creates a new user in the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the user is created.
 */
const createUser = async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await db.query('INSERT INTO users(email, password) VALUES($1, $2) RETURNING *', [email, hashedPassword]);
        res.status(201).send("user created");
    } catch (error) {
        res.status(500).send(error.message);
    }
}

/**
 * Handles the login functionality.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the login process is complete.
 */
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (await bcrypt.compare(password, user.rows[0].password)) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET);
            res.status(200).json({ token });
        } else {
            res.status(401).send("invalid credentials");
        }
    } catch (error) {
        res.status(500).send("error logging in");
    }
}

module.exports = {
    createUser
};