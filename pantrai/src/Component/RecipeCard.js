import React from 'react';
// import '../Styles/welcome.css';
import '../Styles/recipes.css';
const RecipeCard = ({title, image, source}) => {
    
    
    const handleViewRecipe = () => {
        window.open(source, '_blank', 'noopener,noreferrer');
    };
    
    
    
    return (
        <div className="recipe-card" >
            <img src={image} className="recipe-image" alt="..." />
            <h2>{title}</h2>
            <button onClick={handleViewRecipe} className="recipe-button">
                View Recipe
            </button>
        </div>
    );
};

export default RecipeCard;