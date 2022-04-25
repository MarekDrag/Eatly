import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from '../axios';
import AuthContext from '../contexts/authContext';

export default function Login(){
    const [formValues, setFormValues] = useState({ email: '', password: ''});
    const [userValid, setUserValid] = useState(false);
    const [errMsg, setErrMsG] = useState(true);
    const {auth, setAuth} = useContext(AuthContext);
    const navigate = useNavigate();

        
    async function submit(e){
        e.preventDefault();
        await axios.get('/api/users')
            .then(res => {
                let response = res.data;
                for(const key in response){
                    if(formValues.email === response[key].email && formValues.password === response[key].password){
                        setUserValid(true)
                        setErrMsG(true)
                        break;
                    }
                    setErrMsG(false)
                }
            })
        if(userValid){
            setAuth(!auth)
            localStorage.setItem('email', formValues.email);
            navigate('/');
        }
    }

    function handleChange(e){
        const { name, value } = e.target;
        setFormValues({...formValues, [name]: value});
    }

    return(
        <PageContainer>
            <Container>
                <Title>Logowanie</Title>
                <Form onSubmit={submit}>
                    <FormItem>
                        <Label htmlFor='email'>E-mail</Label>
                        <Input 
                            id='email' 
                            name='email' 
                            type='email'
                            value={formValues.email}
                            onChange={handleChange}
                            />
                    </FormItem>
                    <FormItem>
                        <Label htmlFor='password'>Hasło</Label>
                        <Input 
                            type='password' 
                            id='password' 
                            name='password'
                            value={formValues.password}
                            onChange={handleChange}
                            />
                    </FormItem>
                    <Error>{errMsg ? '' : "Email lub Hasło jest nieprawidłowe"}</Error>
                    <Submit type='submit'>Zaloguj się</Submit>
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
    height: 500px;
    margin: 10vh 0 30vh 0;
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
    height: 400px;
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

const Submit = styled.button`
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

const Error = styled.p`
    margin-top:1px;
    color: #ff2929;
    font-weight:600;
`;




