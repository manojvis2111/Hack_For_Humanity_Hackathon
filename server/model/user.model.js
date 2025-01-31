const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({username: {
    type: String,
    required: true,
    unique: true
},
password: {
    type: String,
    required: true
},
streak: {
    type: Number,
    required: true
},
ingredients: [{
    name: { type: String, required: true },  // Name of the ingredient
    SVGfilepath: { type: String, required: true }, // Path to the SVG file
    quantity: { type: Number, required: true }, // Quantity of the ingredient
    unit: { type: String, required: true }, // Unit of measurement (e.g., grams, liters)
    shelfLife: { type: Number, required: true } // Expiry date or best-before date
}]
});

const User = mongoose.model("User", userSchema);
module.exports = User;