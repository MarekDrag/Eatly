import { Link } from "react-router-dom";
import styled from "styled-components"

export default function PageNotFound(){
    return(
    <Container>
        <NotFound>Strona nie istnieje</NotFound>
        <NotFound>404</NotFound>
        <Link to='/planer-posilkow'>Wróć do strony głównej</Link>
    </Container>
    )
}

const Container = styled.div`
    display:flex;
    justify-content:center;
    align-content:center;
    flex-wrap:wrap;
    width:100%;
    height:100vh;
    background:#F0F2F5;
    & a {
        color: #00857A;
        text-decoration:none;
    }
`;

const NotFound = styled.div`
    width:100%;
    margin-bottom:1em;
    text-align:center;
    font-size:2em;
`;

