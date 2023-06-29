"use client";

import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { Input } from "@mui/material";
import { Button } from "@mui/material";

export default function Login() {
  return (
    <>
      <Main>
        <img src="logo.svg" />
        <LogIn>
          <Header>Login</Header>
          <Form>
            <InputField placeholder="Email address" type="email" />
            <InputField placeholder="Password" type="text" />
            <LogDone>Login to your account</LogDone>
            <SingDiv>
              <Question>Don’t have an account?</Question>
              <SignUp>Sing Up</SignUp>
            </SingDiv>
          </Form>
        </LogIn>
      </Main>
    </>
  );
}

const Main = styled(Box)`
  padding: 48px 24px 170px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const LogIn = styled(Box)`
  border-radius: 10px;
  background: var(--semi-dark-blue, #161d2f);
  margin-top: 58px;
  width: 100%;
  padding: 24px 24px 32px 24px;
  display: flex;
  flex-direction: column;
`;

const Header = styled(Typography)`
  color: var(--pure-white, #fff);
  font-size: 32px;
  font-family: Outfit;
  font-weight: 300;
  letter-spacing: -0.5px;
`;

const Form = styled(Box)`
  width: 100%;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
`;

const InputField = styled(Input)`
  font-size: 15px;
  font-family: Outfit;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  opacity: 0.5;
  padding: 0px 0px 18px 16px;
  color: var(--pure-white, #fff);
  border: none;
  margin-top: 24px;
  border-bottom: 1px solid #5a698f;
`;

const LogDone = styled(Button)`
  border-radius: 6px;
  background: var(--red, #fc4747);
  color: var(--pure-white, #fff);
  text-align: center;
  font-size: 13px;
  font-family: Outfit;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  padding: 14px 30px 15px 30px;
  margin-top: 40px;
`;

const SingDiv = styled(Box)`
  width: 100%;

  margin-top: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Question = styled(Typography)`
  color: var(--pure-white, #fff);
  font-size: 15px;
  font-family: Outfit;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

const SignUp = styled(Button)`
  color: var(--red, #fc4747);
  font-size: 12px;
  font-family: Outfit;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;
