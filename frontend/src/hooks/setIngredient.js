import axios from "../axios";


export default async function setIngredient() {

    const name = "ser";
    const id = 34;
    const calories = 3.83;
    const measure = 'g';
    const price = 7.29;

    const ingredient = {
        name,
        id,
        calories,
        measure,
        price,
    };
    await axios.post("http://localhost:5000/api/ingredients", ingredient);
    console.log('ok');
   
  
}
