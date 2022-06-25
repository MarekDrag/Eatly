import { useEffect, useState, useRef, useContext } from 'react';
import axios from '../axios';
import styled from 'styled-components';
import Loading from '../components/loading';
import AuthContext from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';


export default function MyAccount(){
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(false);
    const {setAuth} = useContext(AuthContext);
    const navigate = useNavigate();
    const password = useRef();
    
    const getUser = async() => {
        const userId = sessionStorage.getItem('userId');
        const res = await axios.get(`/api/users/${userId}`);
        setUser(res.data);
        setLoading(!loading);
    }

    const deleteUser = async(e) => {
        e.preventDefault();
        if(user.password === password.current.value){
            await axios.delete(`/api/users/${user._id}`);
            setAuth(false);
            sessionStorage.clear();
            navigate('/zaloguj-sie');
        }
    }

    useEffect(() => {
        getUser()
    },[])

    return(
        <Container>
            {loading ? (
                <Wrapper>
                    <Title>Moje konto</Title>
                    <UserData>Email: {user.email}</UserData>
                    <UserData>Nazwa: {user.name}</UserData>
                        <Form>
                            <Label htmlFor='password'>Podaj hasło:</Label>
                            <Input type='password' id='password' ref={password}/>
                            <Submit onClick={deleteUser}>Usuń konto</Submit>
                        </Form>
                        <p>*Usunięcie konta jest nie odwracalne</p>
                </Wrapper>

            ) : (
                <Wrapper><Loading/></Wrapper>
            )}
        </Container>
    )
}

const Container = styled.div`
    padding-top: 70px;
    min-height: 100vh;
    width: 100%;
    background:#F7F8F9;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap:wrap;
    width:50%;
    height:50vh;
    margin:40px auto;
    background:#FFF;
    box-shadow: rgba(0,0,0,0.1) 0 2px 4px 0, rgba(0,0,0,0.1) 0 8px 16px 0;
    border-radius: 5px;
    @media(max-width:1000px){
        width:90%;
    }
`;

const Title = styled.h2`
    width:100%;
    height:40px;
    margin-top:50px;
    text-align:center;
    color: #00857a;
`;

const UserData = styled.div`
    width:100%;
    margin-left:30%;
    margin-bottom:10px;
`;

const Form = styled.form`
    width:100%;
    margin-left:30%;
    margin-top:20px;
`;

const Label = styled.label`
`;

const Input = styled.input`
    margin-top:10px;
    margin-left:5px;
`;

const Submit = styled.button`
    width:100px;
    height:30px;
    margin-left:30px;
    border:none;
    border-radius:4px;
    background: #e54747;
    color:#fff;
    &:active{
        background: #c10000;
    }
`;

