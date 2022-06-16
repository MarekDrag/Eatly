import { Link } from "react-router-dom";
import styled from "styled-components"

export default function PageNotFound(){
    return(
    <Container>
        <Number>404</Number>
        <NotFound>Strony nie znaleziono</NotFound>
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
    background:#F7F8F9;
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

const Number = styled.div`
    width:100%;
    margin-bottom:1em;
    text-align:center;
    font-size:4em;
`;

