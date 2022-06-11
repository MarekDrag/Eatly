import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

export default function Dish({mealName, options, mealsID, mealsNames}){
    return(
        <Dish key={uuidv4()}>
            <BoxType>Obiad</BoxType>
            <Select name='lunch' onChange={e => handleChange(e)}>
                <option value={mealsID.breakfast}>{mealsNames.lunch.toLocaleUpperCase()}</option>
                {props.options.lunch.map(recipe => (
                  <option key={uuidv4()} value={JSON.stringify({id:recipe._id, recipe:recipe.name})}>
                    {recipe.name}
                  </option>
                ))}
            </Select>
        </Dish>
    )
}


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