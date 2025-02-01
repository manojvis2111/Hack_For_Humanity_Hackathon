const express = require('express');
const User = require('../model/user.model.js');
const router = express.Router();


// Check if a user exists given the username and password
router.get('/login/:username/:password', async (req, res) => {
    const { username, password } = req.params;

    try {
        const user = await User.findOne({ username: username, password: password });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        else{
            res.json(user);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


//get a user's streak value given the username
router.get('/streak/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ streak: user.streak });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});






// Reducing a specific item of a users inventory given the username and the item name
router.post('/reduce_ingredient', async (req, res) => {
    const { username, name } = req.body;

    try {
        const user = await User.findOne({ username: username });        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const ingredient = user.ingredients.find(ingredient => ingredient.name === name);
        if (!ingredient) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }
        ingredient.quantity -= 1;
        await user.save();
        res.json(user.ingredients);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// Reduce Shelf life of all ingredients in the inventory given the username by calculating number of days between the last login date and today's date
router.post('/reduce_shelf_life/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const lastLoginDate = new Date(user.last_login);
        const currentDate = new Date();
        const timeDifference = currentDate.getTime() - lastLoginDate.getTime();
        const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
        //const initial_streak = user.streak;
        let isStreakBroken = false;
        if (daysDifference > 0) {
            user.ingredients.forEach(ingredient => {
                const initial_shelfLife = ingredient.shelfLife;
                if(initial_shelfLife >0){
                    ingredient.shelfLife -= daysDifference;
                }
                if(ingredient.shelfLife < 0){
                    ingredient.shelfLife = 0;
                    ingredient.quantity = 0;
                    user.streak = 0;
                    isStreakBroken = true;
                }
                
            });
            if(!isStreakBroken)
                {user.streak += daysDifference;}
            user.last_login = currentDate;
            await user.save();
        }

        res.json(user.ingredients);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// Adding a User account given username and password in the URL
router.post('/add_user/:username/:password', async (req, res) => {
    const { username, password } = req.params;
    const user = new User({
        username: username,
        password: password,
        streak: 0,
        last_login: new Date(),
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
    console.log(req.body);
    const { username, itemName, SVGfilepath, quantity, unit, shelfLife } = req.body;
    console.log(username, itemName, SVGfilepath, quantity, unit, shelfLife);
    const ingredient = {
        name: itemName,
        SVGfilepath: SVGfilepath,
        quantity: Number(quantity),
        unit: unit,
        shelfLife: shelfLife
    };

    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the ingredient already exists
        const existingIngredient = user.ingredients.find(ingredient => ingredient.name === itemName);
        if (existingIngredient) {
            // Update the existing ingredient

            existingIngredient.SVGfilepath = SVGfilepath;
            existingIngredient.quantity = Number(existingIngredient.quantity) + Number(quantity);
            existingIngredient.unit = unit;
            existingIngredient.shelfLife = shelfLife;
        } else {
            // Add the new ingredient
            console.log('adding new ingredient')
            user.ingredients.push(ingredient);

        }

        await user.save();
        res.status(201).json(user.ingredients);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});








module.exports = router;
