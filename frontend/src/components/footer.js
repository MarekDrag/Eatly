import React from 'react';
import styled from 'styled-components';

export default function Footer(){
    return(
        <Container>
            <div>
                Copyright © 2022 Eatly
            </div>
        </Container>
    )
}

const Container = styled.footer`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100px;
    background: rgb(90, 89, 89);
    color: white;
`;
    
