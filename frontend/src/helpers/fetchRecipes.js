import axios from '../axios';

async function fetchRecipes(isSort){
    try{
        const recipes = await axios.get("/api/recipes");
        if(isSort){
            let breakfast = recipes.filter(recipe => recipe.type === "breakfast");
            let lunch = recipes.filter(recipe => recipe.type === "lunch");
            let dinner = recipes.filter(recipe => recipe.type === "dinner");
            return { breakfast, lunch, dinner };
        } else return recipes;
    } 
    catch (ex) {
        console.log(ex.response);
    }
}

export default fetchRecipes;