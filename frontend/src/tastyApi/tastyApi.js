import axios from "axios";

const fetchDishes = async() => {
    let tag = 'under_30_minutes'
    const options = {
        method: 'GET',
        url: 'https://tasty.p.rapidapi.com/recipes/list',
        params: {from: '0', size: '1', tags: {tag}},
        headers: {
          'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
          'X-RapidAPI-Key': 'fd365bc74amshc7de2402ecd9e44p13b0eejsn7b20538b4486'
        }
    };

    const res = await axios.request(options);
    
    let newDishes = [];
    for(const key in res.data.results){
        const dish = res.data.results[key]

        const name = dish.name;
        const slug = dish.slug;
        const ingredient = dish.sections;
        const recipe = dish.instructions;
        const description = dish.description;
        const nutrition = dish.nutrition;
        const num_servings = dish.num_servings;
        const cooking_time = dish.total_time_minutes;
        const topics = dish.topics;
        const img_url = dish.thumbnail_url;
        const img_alt = dish.thumbnail_alt_text;

        newDishes.push({
            name,
            slug,
            ingredient,
            recipe,
            description,
            nutrition,
            num_servings,
            cooking_time,
            topics,
            img_url,
            img_alt
        })
        axios.post('/api/dishes', newDishes[key])
        .then(res => console.log(res.data));
    }
    
}

export default fetchDishes;
