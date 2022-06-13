import axios from '../axios';

async function getRecipes(isSort){
    try{
        const res =  await axios.get("/api/recipes");
        const recipes = res.data;
        if(isSort){
            let breakfast = recipes.filter(recipe => recipe.type === "breakfast");
            let lunch = recipes.filter(recipe => recipe.type === "lunch");
            let dinner = recipes.filter(recipe => recipe.type === "dinner");
            return { breakfast, lunch, dinner };
        } 
        else {
            return recipes;
        }
    } 
    catch (ex) {
        console.log(ex.response);
    }
}

export default getRecipes;