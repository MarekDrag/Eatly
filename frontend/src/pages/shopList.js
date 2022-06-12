import styled from "styled-components";
import fetchRecipes from "../helpers/FetchRecipes";
import useDate from "../hooks/useDate";

export default function ShopList(){
    const [date, dispatch] = useDate();


    const recipes = fetchRecipes(false);


    return(
        <Container>
            <Title>Lista zakupów</Title>

        </Container>
    )
}


const Container = styled.div`
    padding-top:70px;
    min-height:100vh;
    width:100%;
`;

const Title = styled.h2`
    width:100%;
    margin-top:50px;
    text-align:center;
`;