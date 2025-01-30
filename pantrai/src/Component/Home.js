import React from 'react';
import Welcome from './Welcome';
import Inventory from './Inventory';
import Recipes from './Recipes';
// import '../Styles/height.css';
import '../Styles/welcome.css';

const Home = () => {
    return (
        <div class='outer'>
            <Welcome />
            <Inventory />
            <Recipes />
        </div>
    );
};

export default Home;