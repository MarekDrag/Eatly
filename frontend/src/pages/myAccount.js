import { useEffect, useState } from 'react';
import axios from '../axios';
import styled from 'styled-components';
import Loading from '../components/loading';


export default function MyAccount(){
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(false);
    
    const getUser = async() => {
        const userId = sessionStorage.getItem('userId');
        const res = await axios.get(`/api/users/${userId}`);
        setUser(res.data);
        setLoading(!loading);
    }

    const deleteUser = (e) => {
        e.preventDefault();

    }

    useEffect(() => {
        getUser()
    },[])

    return(
        <Container>
            <Title>Moje konto</Title>
            {loading ? (
                <Wrapper>
                    <UserData>Email: {user.email}</UserData>
                    <UserData>Nazwa: {user.name}</UserData>
                      

                        <FormItem>
                            <Label>Podaj hasło:</Label>
                            <Input/>
                        <DeleteButton onClick={deleteUser}>Usuń konto</DeleteButton>
                        </FormItem>
                        <p>*Usunięcie konta jest nie odwracalne</p>
                </Wrapper>

            ) : (
                <WrapperLoading><Loading/></WrapperLoading>
            )}
        </Container>
    )
}

const Container = styled.div`
    display:flex;
    justify-content:center;
    flex-wrap:wrap;
    padding-top: 70px;
    min-height: 100vh;
    width: 100%;
    background:#F7F8F9;
`;

const Title = styled.h2`
  margin-top:50px;
  color: #00857a;
`;

const Wrapper = styled.div`
    margin-top:10vh;
`;


const FormItem = styled.form`
    width:100%;
    margin-top:20px;
`;

const Label = styled.label`

`;

const Input = styled.input`
    margin-top:10px;
    margin-right:100%;
`;

const UserData = styled.div`
    margin-bottom:10px;
`;

const Submit = styled.button`
    width:100px;
    height:30px;
    margin:10px 0;
    border:none;
    border-radius:4px;
    background: #00857a;
    color:#fff;
    &:hover{
        background: #069B8C;
    }
`;

const DeleteButton = styled.button`
    width:100px;
    height:30px;
    margin: 10px 0;
    border:none;
    border-radius:4px;
    background: #e54747;
    color:#fff;
    &:hover{
        background: #c10000;
    }
`;

const WrapperLoading = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
    height:100%;
`;