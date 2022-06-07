import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "../axios";
import validateRegister from "../helpers/validateRegister";

export default function Register() {
  const initialValue = {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    mealPlan:{}
  };
  const [formValues, setFormValues] = useState(initialValue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isRegistered, setIsResgistered] = useState(false);

  async function submit(e) {
    e.preventDefault();
    let err = await validateRegister(formValues);
    setFormErrors(err);
    setIsSubmit(true);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      setIsResgistered(true);
      axios.post("/api/users", formValues).then((res) => console.log(res.data));
    }
  }, [formErrors]);

  return (
    <PageContainer>
      <Wrapper>
        {!isRegistered ? (
          <>
            <Form onSubmit={submit}>
              <Title>Rejestracja</Title>
              <FormItem>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="E-mail"
                  value={formValues.email}
                  onChange={handleChange}
                />
                <Error>{formErrors.email}</Error>
              </FormItem>
              <FormItem>
                <Label htmlFor="name">Nazwa użytkownika</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="nazwa użytkownika"
                  value={formValues.name}
                  onChange={handleChange}
                />
                <Error>{formErrors.name}</Error>
              </FormItem>
              <FormItem>
                <Label htmlFor="password">Hasło</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="minimum 8 znaków"
                  value={formValues.password}
                  onChange={handleChange}
                />
                <Error>{formErrors.password}</Error>
              </FormItem>
              <FormItem>
                <Label htmlFor="confirmPassword">Powtórz hasło</Label>
                <Input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="powtórz hasło"
                  value={formValues.confirmPassword}
                  onChange={handleChange}
                />
                <Error>{formErrors.confirmPassword}</Error>
              </FormItem>
              <Submit type="submit">Stwórz konto</Submit>
            </Form>
          </>
        ) : (
          <Container>
            <Text>Witaj {formValues.name}!</Text>
            <Text>Twoje konto zostało utworzone!</Text>
            <Link href="/zaloguj-sie">Teraz możesz się zalogować</Link>
          </Container>
        )}
      </Wrapper>
    </PageContainer>
  );
}

const PageContainer = styled.div`
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
  flex-wrap: wrap;
  width: 50%;
  height: 60vh;
  margin: 15vh 0 30vh 0;
  box-shadow: 0 0 1em;
  border-radius: 5px;
  background:#F0F2F5;
  @media(max-width:1000px){
    width:100%;
    box-shadow:none;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const Text = styled.span`
  width: 100%;
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  color: #00857A;
`;

const Link = styled.a`
  width: 100%;
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  color: #c9c9c9;
  text-decoration: none;
  &:hover {
    color: #969696;
  }
`;

const Title = styled.h2`
  width: 100%;
  text-align: center;
  color: #00857A;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 70%;
  height: 60vh;
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
  border-radius: 4px;
  border: none;
  padding: 10px;
  border: 1px solid #767676;
`;

const Submit = styled.button`
  width: 50%;
  padding: 1em;
  margin-top:2em;
  font-size: 1em;
  font-weight: 600;
  background: #00857A;
  color: white;
  border-radius: 4px;
  border: none;
  &:hover {
    background: #00756F;
  }
`;

const Error = styled.p`
  margin-top: 1px;
  color: #ff2929;
  font-weight: 600;
`;
