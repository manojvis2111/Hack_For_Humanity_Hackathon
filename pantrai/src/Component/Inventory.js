import React from 'react';
import '../Styles/section.css';
import axios from 'axios'; 
import { useState, useEffect } from 'react';
// import item from './Item.js';
import Item from './Item.js';
import '../Styles/inventory.css';
import AddItemForm from './AddItemForm.js';
 
const Inventory = ({username}) => {
    // get the invertory of username and generate the Item icons for each item
    const [items, setItems] = useState([]);
    const [showAddItemForm, setShowAddItemForm] = useState(false);

    useEffect(() => {    
        axios.get('http://localhost:3000/userdata/inventory/' + username)
        .then(response => {
            setItems(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);
    console.log(items);
    const itemlist = items.map(item => {
        return <Item key={item.name} username={username} name={item.name} path={item.SVGfilepath} quantity={item.quantity} shelflife={item.shelfLife}/>
    });
    return (
        <div className='section'>
            <h1 className='inventory-title'>Inventory</h1>
            <button onClick={() => setShowAddItemForm(true)}>Add Items</button>
            {showAddItemForm && <AddItemForm username={username} onClose={() => setShowAddItemForm(false)} />}

        <div className='inventory'>
            {itemlist}
        </div>
        </div>
    );




    
};

export default Inventory;

// return (
//     <div class='section'>
//         {/* <h2>Inventory</h2> */}
//         {/* <br></br>
//         <br></br> */}
//         <Item name='Apple' path='icons/apple.svg' quantity='5' shelflife='6 days'/>
//         <Item name='Banana' path='icons/banana.svg' quantity='3' shelflife='4 days'/>
//         <Item name='Carrot' path='icons/carrot.svg' quantity='2' shelflife='7 days'/>
//         <Item name='Carrot' path='icons/carrot.svg' quantity='2' shelflife='7 days'/>
//         <Item name='Carrot' path='icons/carrot.svg' quantity='2' shelflife='7 days'/>
//         <Item name='Carrot' path='icons/carrot.svg' quantity='2' shelflife='7 days'/>
//         <Item name='Carrot' path='icons/carrot.svg' quantity='2' shelflife='7 days'/>
//         <Item name='Carrot' path='icons/carrot.svg' quantity='2' shelflife='7 days'/>
//         <Item name='Carrot' path='icons/carrot.svg' quantity='2' shelflife='7 days'/>
//         <Item name='Carrot' path='icons/carrot.svg' quantity='2' shelflife='7 days'/>
        
//     </div>
// );