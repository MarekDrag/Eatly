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
        let userId = '';
        await axios.get('/api/users').then(res => {
            for(const key in res.data){
                if(formValues.email === res.data[key].email && formValues.password === res.data[key].password){
                    setUserValid(true);
                    setErrMsG(true);
                    userId = res.data[key]._id;
                    break;
                }
                setErrMsG(false)
            }
        })
        if(userValid){
            setAuth(!auth);
            sessionStorage.setItem('userId', userId);
            navigate('/planer-posilkow');
        }
    }

    function handleChange(e){
        const { name, value } = e.target;
        setFormValues({...formValues, [name]: value});
    }

    return(
        <Container>
            <Wrapper>
                <Title>Zaloguj się</Title>
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
                    <Error>{errMsg ? '' : "Email lub hasło jest nieprawidłowe"}</Error>
                    <Submit type='submit'>Zaloguj się</Submit>
                </Form>
            </Wrapper>
        </Container>
    )
}


const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background:#F0F2F5;
`;
    
const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap:wrap;
    width: 50%;
    min-width: 300px;
    height: 500px;
    margin: 15vh 0 30vh 0;
    background:#F0F2F5;
    box-shadow: 0 0 1em;
    border-radius: 5px;
    @media(max-width:1000px){
        width:100%;
        box-shadow:none;
    }
`;

const Title = styled.h2`
    width: 100%;
    text-align: center;
    color: #00857A;
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
    padding: 10px;
    border-radius:4px;
    border: none;
    border: 1px solid #767676;
`;

const Submit = styled.button`
    width: 50%;
    padding: 1em;
    font-size: 1em;
    font-weight: 600;
    background: #00857A;
    color: white;
    border-radius:4px;
    border: none;
    &:hover{
        background: #00756F;
    }   
`;

const Error = styled.p`
    color: #ff2929;
    font-weight:600;
    width: 100%;
    text-align:center;
`;




