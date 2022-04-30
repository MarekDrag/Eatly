import axios from "axios";

// fetch recipes from tastyApi and send to the Database

export default async function tastyAp() {
  let type = "snacks";

  const options = {
    method: "GET",
    url: "https://tasty.p.rapidapi.com/recipes/list",
    params: { from: "40", size: "40", tags: `${type}` },
    headers: {
      "X-RapidAPI-Host": "tasty.p.rapidapi.com",
      "X-RapidAPI-Key": "d4c1e1947cmsh731f96d3cd6c3a1p1fdb6djsn054f0e35ccf7",
    },
  };

  axios
    .request(options)
    .then((response) => {
      console.log(response.data.results);
      sendRecipes(response.data.results);
    })
    .catch((error) => {
      console.error(error);
    });

  async function sendRecipes(props) {
    for (const key in props) {
      let name = props[key].name;
      let slug = props[key].slug;
      let id = props[key].id;
      let cooking_time = props[key].total_time_minutes;
      let nutrition = props[key].nutrition;
      let img_url = props[key].thumbnail_url;

      let ingredients = [];
      if (props[key].sections) {
        props[key].sections.map((section) => {
          section.components.map((component) => {
            ingredients.push(component.raw_text);
          });
        });
      }
      let instructions = [];
      if (props[key].instructions) {
        props[key].instructions.map((instruction) => {
          instructions.push(instruction.display_text);
        });
      }

      const rend = props[key].renditions[0];
      let video;
      if (props[key].renditions.length > 0) {
        const url = rend.url;
        const width = rend.width;
        const height = rend.height;
        const poster_url = rend.poster_url;
        video = { url, width, height, poster_url };
      }
      if(!name) {
        continue;
      }
      if(!slug) {
        continue;
      }
      if(!id) {
        continue;
      }
      if(!ingredients) {
        continue;
      }
      if(!instructions) {
        continue;
      }
      if(!cooking_time) {
        cooking_time = 0;
      }
      if(nutrition === undefined || Object.keys(nutrition).length === 0){
        continue;
      }
      if(!img_url) {
        continue;
      }
      if(video === undefined) {
        video = {};
      }

      const recipe = {
        name,
        slug,
        id,
        ingredients,
        instructions,
        cooking_time,
        nutrition,
        type,
        img_url,
        video,
      };
      await axios.post("http://localhost:5000/api/recipes", recipe);
      console.log('ok');
    }
  }
}
