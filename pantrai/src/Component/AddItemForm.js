import React, { useState } from 'react';
import axios from 'axios';

const AddItemForm = ({ username, onClose }) => {
    const [itemName, setItemName] = useState('');
    const [SVGfilepath, setSVGfilepath] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('');
    const [shelfLife, setShelfLife] = useState('');

    const handleFetchIngredient = async (itemName) => {
        try {
            console.log(itemName);
            const response = await axios.get(`http://localhost:3000/api/item/${itemName}`);
            const ingredient = response.data;
            console.log(ingredient);
            if (ingredient) {
                // const { name,SVGfilepath, shelflife } = ingredient;
                
                // const SVGfilepath = ingredient.SVGPathElement;
                // const shelflife = ingredient.shelfLife;
                //console.log(SVGfilepath, shelflife);
                console.log(ingredient.SVGPathElement, ingredient.shelfLife);
                setSVGfilepath(ingredient.SVGPathElement);
                setShelfLife(ingredient.shelfLife);
                
                //console.log(SVGfilepath);
            }
        } catch (error) {
            console.error('Error fetching ingredient information:', error);
        }
    };


    const handleAddItem = async (e) => {
        e.preventDefault();
        try {
            console.log('Adding item:', { username, itemName, SVGfilepath, quantity, unit, shelfLife });
            console.log(username, itemName, SVGfilepath, quantity, unit, shelfLife);
            const response = await axios.post('http://localhost:3000/userdata/add_ingredient/', {
                username,
                itemName,
                SVGfilepath,
                quantity,
                unit,
                shelfLife
            });
            if (response.status === 201) {
                alert('Item added successfully');
                //onClose(); // Close the form after successful submission
            }
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    return (
        <div>
            <h2>Add Item</h2>
            <div>
                <label>
                    Item Name:
                    <select value={itemName} onChange={(e) => {setItemName(e.target.value);handleFetchIngredient(e.target.value);}}>
                        <option value="">Select an item</option>
                        <option value="Apple">Apple</option>
                        <option value="Avocado">Avocado</option>
                        <option value="Banana">Banana</option>
                        <option value="Beans">Beans</option>
                        <option value="Steak">Beef</option>
                        <option value="Broccoli">Broccoli</option>
                        <option value="Capsicum">Capsicum</option>
                        <option value="Carrot">Carrot</option>
                        <option value="Cherries">Cherries</option>
                        <option value="Chicken">Chicken</option>
                        <option value="Cucumber">Cucumber</option>
                        <option value="Egg">Egg</option>
                        <option value="Eggplant">Eggplant</option>
                        <option value="Fish">Fish</option>
                        <option value="Garlic">Garlic</option>
                        <option value="Ginger">Ginger</option>
                        <option value="Grapes">Grapes</option>
                        <option value="Lemon">Lemon</option>
                        <option value="Lettuce">Lettuce</option>
                        <option value="Mango">Mango</option>
                        <option value="Milk">Milk</option>
                        <option value="Mushroom">Mushroom</option>
                        <option value="Onion">Onion</option>
                        <option value="Orange">Orange</option>
                        <option value="Peach">Peach</option>
                        <option value="Pear">Pear</option>
                        <option value="Pineapple">Pineapple</option>
                        <option value="Potato">Potato</option>
                        <option value="Powder">Powder</option>
                        <option value="Pumpkin">Pumpkin</option>
                        <option value="Shrimp">Shrimp</option>
                        <option value="Strawberry">Strawberry</option>
                        <option value="Watermelon">Watermelon</option>
                        <option value="Yoghurt">Yoghurt</option>
                        <option value="Zucchini">Zucchini</option>
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Quantity:
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Unit:
                    <input
                        type="text"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                    />
                </label>
            </div>
            <button onClick={handleAddItem}>Add Item</button>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default AddItemForm;