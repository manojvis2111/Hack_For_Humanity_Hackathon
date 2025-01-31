const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },  // Name of the item
    SVGPathElement: { type: String, required: true }, // Path to the SVG file
    shelfLife: { type: Number, required: true } // Number of days since purchase date for expiry
    });

const Item = mongoose.model("Item", itemSchema);
module.exports = Item; 