import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Recipes(){
    return(
        <Container>
            <Titles>
                <Title>Śniadanie</Title>
                <Title>Obiad</Title>
                <Title>Kolacja</Title>
                <Title>
                    <Link to='/dodaj-przepis'>+Dodaj Przepis</Link>
                </Title>
            </Titles>
            <Wrapper>
                <Recipe>
                    <Image src="https://cdn.aniagotuje.com/pictures/articles/2021/10/20290192-v-1080x1080.jpg"/>
                    <Name>name</Name>
                    <CookingTime>czas gotowania: 30 m</CookingTime>
                </Recipe>
            </Wrapper>
        </Container>
    )
}

const Container = styled.div`
    display:flex;
    justify-content:center;
    flex-wrap:wrap;
    width:100%;
    min-height:100vh;
    padding-top:70px;
`;

const Titles = styled.div`
    display:flex;
    justify-content: center;
    gap:10px;
    height:3em;
    width:80%;
    margin-top:10%;
`;

const Title = styled.button`
    display:flex;
    justify-content:center;
    align-items:center;
    width:10em;
    height:3em;
    background: #00857A;
    color:#fff;
    font-weight:600;
    border-radius:5px;
    border:none;
    &:hover{
        background: #069b8c;
        cursor:pointer;
    }
    & a{
        color:#fff;
        text-decoration:none;
    }
`;

const Wrapper = styled.div`
    display: flex;
    flex-wrap:wrap;
    justify-content:center;
    gap:20px;
    width:90%;
    margin:10% 0;
`;

const Recipe = styled.div`
    border:1px solid #adadad;
    width:250px;
`;


const Image = styled.img`
    width:250px;
`;

const Name = styled.div`
    width:250px;
    font-size:1.5em;
`;

const CookingTime = styled.div`
    width:250px;
`;
