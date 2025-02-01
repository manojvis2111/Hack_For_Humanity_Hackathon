import React from 'react';
import '../Styles/item.css';
import { useState } from 'react';
import axios from 'axios';
const Item = ({ username,name, path, quantity, shelflife }) => {

    const [currentQuantity, setCurrentQuantity] = useState(quantity);

    const handleUseItem = async () => {
        if (currentQuantity > 0) {
            setCurrentQuantity(currentQuantity - 1);
            try {
                const response = await axios.post('http://localhost:3000/userdata/reduce_ingredient', {
                    username,
                    name
                });
                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                console.error('Error updating quantity:', error);
                setCurrentQuantity(currentQuantity + 1);
            }
        }
    };

    return (
        <div className='item-card'>
            <img src={path} alt={name} className='item-image'/>
            <h2>{name}</h2>
            <p>Quantity: {currentQuantity}</p>
            <p>Shelf Life: {shelflife}</p>
            <button onClick={handleUseItem} style={{ backgroundColor: '#DA8F56' }}>Use x1</button>
        </div>
    );
};

export default Item;