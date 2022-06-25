import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

function Meal({mealType, options, mealsID, mealsNames, handleChange}){
  const mealTypeTranslated = {breakfast:'Śniadanie', lunch:'Obiad', dinner:'Kolacja'}

  return(
      <Dish key={uuidv4()}>
          <BoxType>{mealTypeTranslated[mealType]}</BoxType>
          <Select name={mealType} onChange={e => handleChange(e)}>
              {/* selected option */}
              <option value={mealsID[mealType]}>
                {mealsNames[mealType].toLocaleUpperCase()}
              </option>
              {/* render all options for this meal */}
              {options[mealType].map(recipe => {
                return(
                  <option key={recipe._id} value={JSON.stringify({id:recipe._id, recipe:recipe.name})}>
                    {recipe.name}
                  </option>
                )
              })}
          </Select>
      </Dish>
  )
}

export default Meal;

const Dish = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  position: relative;
  height: 100px;
  border: 1px solid #B9BBBD;
  font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
`;

const BoxType = styled.div`
  position:absolute;
  font-size:20px;
  color:#B9BBBD;
`;

const Select = styled.select`
  height: 100%;
  width: 100%;
  border:none;
  background: #f5f7fa;
  & option {
    text-align:center;
  }
`;
