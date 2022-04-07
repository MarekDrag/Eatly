import React from 'react';
import styled from 'styled-components';

export default function Register(){
    return(
        <PageContainer>
            <Container>
                <Title>Rejestracja</Title>
                <Form>
                    <FormItem>
                        <Label htmlFor='email'>E-mail</Label>
                        <Input id='email' name='email' type='email' placeholder='E-mail'/>
                    </FormItem>
                    <FormItem>
                        <Label htmlFor='name'>Nazwa</Label>
                        <Input id='name' name='name' type='text' placeholder='Nazwa'/>
                    </FormItem>
                    <FormItem>
                        <Label htmlFor='password'>Hasło</Label>
                        <Input type='password' id='password' name='password' placeholder='Hasło'/>
                    </FormItem>
                    <FormItem>
                        <Label htmlFor='password'>Powtórz Hasło</Label>
                        <Input type='password' id='password' name='password' placeholder='Powtórz Hasło'/>
                    </FormItem>
                    <Submit type='submit' value='Zarejestruj się'/>
                </Form>
            </Container>
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: calc(100vh - 70px);
`;
    
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap:wrap;
    background: white;
    box-shadow: 0 0 1em;
    border-radius: 5px;
    width: 50%;
    min-width: 300px;
    height: 600px;
`;

const Title = styled.h2`
    width: 100%;
    text-align: center;
`;

const Form = styled.form`
    display: flex;
    align-items:center;
    justify-content: center;
    flex-wrap: wrap;
    width: 400px;
    height: 500px;
`;

const FormItem = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
`;  

const Label = styled.label`
    margin-bottom: 10px;
`;

const Input = styled.input`
    width: 90%;
    height: 3em;
    border-radius:4px;
    border: none;
    padding: 10px;
    border: 1px solid #767676;
`;

const Submit = styled.input`
    font-size: 1em;
    font-weight: 600;
    background: #129912;
    color: white;
    border-radius:4px;
    border: none;
    width: 50%;
    padding: 1em;
    &:hover{
        background: #4aaf4a;
    }   
`;