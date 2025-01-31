const express = require('express');
const Item = require('../model/item.model.js');
const router = express.Router();


//get item information using name
router.get('/item/:name', async (req, res) => {
    try{
        const item = await Item.findOne({name: req.params.name});
        if(!item){
            return res.status(404).json({message: 'Item not found'});
        }
        return res.json(item);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});

//post an item
router.post('/item/add_item', async (req, res) => {
    const { name, filePath, shelfLife } = req.body;
    const item = new Item({
        name: name,
        SVGPathElement: filePath,
        shelfLife: shelfLife
    });

    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;

