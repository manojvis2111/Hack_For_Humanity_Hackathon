const express = require('express');
const User = require('../model/user.model.js');
const router = express.Router();

// Adding a User account given username and password in the URL
router.post('/add_user/:username/:password', async (req, res) => {
    const { username, password } = req.params;
    const user = new User({
        username: username,
        password: password,
        streak: 0,
        ingredients: []
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Getting the collection of ingredients given the username
router.get('/inventory/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user.ingredients);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


//Adding an ingredient to the inventory given the username, ingredient name, SVG file path, quantity, unit, and shelf life
router.post('/add_ingredient/', async (req, res) => {
    const { username, name, SVGfilepath, quantity, unit, shelfLife } = req.body;
    const ingredient = {
        name: name,
        SVGfilepath: SVGfilepath,
        quantity: quantity,
        unit: unit,
        shelfLife: shelfLife
    };

    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.ingredients.push(ingredient);
        await user.save();
        res.status(201).json(user.ingredients);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});








module.exports = router;
