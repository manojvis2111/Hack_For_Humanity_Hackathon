import React from 'react';
import '../Styles/section.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import RecipeCard from './RecipeCard';
import '../Styles/recipes.css';
const Recipes = ({username}) => {
    const [ingredientNames, setIngredientNames] = useState('');
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/userdata/inventory/${username}`);
                const ingredients = response.data;
                const names = ingredients.filter(ingredient => ingredient.shelfLife >0).map(ingredient => ingredient.name);
                setIngredientNames(names.join(', '));
            } catch (error) {
                console.error('Error fetching ingredients:', error);
            }
        };

        fetchIngredients();
    }, [username]);

    useEffect(() => {
        const fetchRecipes = async () => {
            if (ingredientNames) {
                try {
                    const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients`, {
                        params: {
                            ingredients: ingredientNames,
                            number: 5, // Number of recipes to fetch
                            apiKey: '142c77c8b53747b197090ba543da620f',
                            ranking: 2 // 1: maximize used ingredients, 2: minimize missing ingredients
                        }
                    });

                    const recipesWithDetails = await Promise.all(response.data.map(async (recipe) => {
                        const recipeDetails = await axios.get(`https://api.spoonacular.com/recipes/${recipe.id}/information`, {
                            params: {
                                apiKey: '142c77c8b53747b197090ba543da620f'
                            }
                        });
                        return {
                            ...recipe,
                            sourceUrl: recipeDetails.data.sourceUrl
                        };
                    }));

                    setRecipes(recipesWithDetails);
                } catch (error) {
                    console.error('Error fetching recipes:', error);
                }
            }
        };

        fetchRecipes();
    }, [ingredientNames]);


    // const renderRecipeCards = () => {
    //     return recipes.map(recipe => (
    //         <RecipeCard 
    //             key={recipe.id} 
    //             title={recipe.title} 
    //             image={recipe.image} 
    //             source={recipe.sourceUrl} 
    //         />
    //     ));

    
    // };
     const renderRecipeCards = recipes.map(recipe => {
        return <RecipeCard 
            key={recipe.id} 
            title={recipe.title} 
            image={recipe.image} 
            source={recipe.sourceUrl} 
        />
     });


    return (
        <div className='section' >
            <h1 className='recipe-title'>Recipes</h1>
            <div className='recipes'>
                {renderRecipeCards}
            </div>
        </div>
    );
};

export default Recipes;