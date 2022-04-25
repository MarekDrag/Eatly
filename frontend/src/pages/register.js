import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from '../axios';

export default function Register(){
    const initialValue = { email: '', name:'', password:'', confirmPassword:''}
    const [formValues, setFormValues] = useState(initialValue);
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false);
    const [isRegistered, setIsResgistered] = useState(false);

    async function submit(e){
        e.preventDefault();
        let err = await validate(formValues);
        setFormErrors(err);
        setIsSubmit(true);
    }

    function handleChange(e){
        const { name, value } = e.target;
        setFormValues({...formValues, [name]: value});
    }

    useEffect(() => {
        if(Object.keys(formErrors).length === 0 && isSubmit){
            setIsResgistered(true);
            axios.post('/api/users', formValues)
                .then(res => console.log(res.data));
        } 
    }, [formErrors])

    

    const validate = async(values) =>{
        const errors = {};
        let checkUser = {name: false, email: false};
        await axios.get('/api/users')
            .then(res => {
                let response = res.data;
                for(const key in response){
                    if(values.email === response[key].email){
                        checkUser.email = true;
                    }
                    if(values.name === response[key].name){
                        checkUser.name = true;
                    }
                }
            })
        const regex =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(!values.email){
            errors.email = "Email jest wymagany";
        } else if (!regex.test(values.email)) {
            errors.email = "Email jest nieprawidłowy";
        } else if (checkUser.email){
            errors.email = "Ten email jest już zajęty";
        }
        if(!values.name){
            errors.name = "Nazwa użytkowanika jest wymagana";
        } else if (checkUser.name){
            errors.name = "Ta nazwa użytkownika jest już zajęta";
        }
        if(!values.password){
            errors.password = "Hasło jest wymagane";
        } else if(values.password.length < 8){
            errors.password = "Hasło musi mieć minimum 8 znaków";
        }
        if(!values.confirmPassword){
            errors.confirmPassword = "Musisz potwierdzić hasło";
        } else if(values.confirmPassword !== values.password){
            errors.confirmPassword = "Hasła nie są takie same"
        }
        return errors;
    }

    return(
        <PageContainer>
            <Container>
            { !isRegistered 
            ?  ( <>
                <Title>Rejestracja</Title>
                <Form onSubmit={submit}>
                    <FormItem>
                        <Label htmlFor='email'>E-mail</Label>
                        <Input 
                            id='email' 
                            name='email' 
                            type='email' 
                            placeholder='E-mail' 
                            value={formValues.email} 
                            onChange={handleChange}/>
                        <Error>{formErrors.email}</Error>
                    </FormItem>
                    <FormItem>
                        <Label htmlFor='name'>Nazwa Użytkownika</Label>
                        <Input 
                            id='name' 
                            name='name' 
                            type='text' 
                            placeholder='Nazwa' 
                            value={formValues.name} 
                            onChange={handleChange}/>
                        <Error>{formErrors.name}</Error>
                    </FormItem>
                    <FormItem>
                        <Label htmlFor='password'>Hasło</Label>
                        <Input 
                            type='password' 
                            id='password' 
                            name='password' 
                            placeholder='Hasło' 
                            value={formValues.password} 
                            onChange={handleChange}/>
                        <Error>{formErrors.password}</Error>
                    </FormItem>
                    <FormItem>
                        <Label htmlFor='confirmPassword'>Powtórz Hasło</Label>
                        <Input 
                            type='password' 
                            id='confirmPassword' 
                            name='confirmPassword' 
                            placeholder='Powtórz Hasło' 
                            value={formValues.confirmPassword} 
                            onChange={handleChange}/>
                        <Error>{formErrors.confirmPassword}</Error>
                    </FormItem>
                    <Submit type='submit'>Zarejestruj się</Submit>
                </Form>
                </>)
            : (<Wrapper>
                    <Text>Witaj {formValues.name}!</Text>
                    <Text>Twoje konto zostało zarejstrowane!</Text>
                    <Link to="/login">Teraz możesz się zalogować</Link>
               </Wrapper>)}
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
    height: 700px;
    margin: 10vh 0 30vh 0;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap:wrap;
`;

const Text = styled.span`
    width: 100%;
    text-align:center;
    margin-bottom:2em;
    font-size: 30px;
    font-weight:600;
    color: #129912;
`;

const Link = styled.a`
    width: 100%;
    text-align:center;
    margin-bottom:2em;
    font-size: 30px;
    font-weight:600;
    color: #c9c9c9;
    text-decoration: none;
    &:hover{
        color: #969696;
    }
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
    height: 600px;
`;

const FormItem = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
`;  

const Label = styled.label`
    width: 100%;
    margin-bottom: 10px;
`;

const Input = styled.input`
    width: 100%;
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