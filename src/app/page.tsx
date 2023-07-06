"use client";

import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { Input } from "@mui/material";
import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
interface TypeErrors {
  response: {
    data: {
      message: string;
    };
  };
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");
  const [submitClicked, setSubmitClicked] = useState(false);
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})$/;

  const router = useRouter();
  const logg = async (email: any, password: any) => {
    setSubmitClicked(true);
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email: email,
        password: password,
      });
      setWarning(response.data.message);
      router.push("/home");
    } catch (error) {
      setWarning((error as TypeErrors).response.data.message);
    }
  };
  console.log(warning);
  return (
    <>
      <Main>
        <img src="logo.svg" />
        <LogIn>
          <Header>Login</Header>
          <Form>
            <InputField
              placeholder="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Warn
              style={{
                display:
                  warning === "Please enter email and password" &&
                  submitClicked &&
                  email === ""
                    ? "block"
                    : "none",
              }}
            >
              "Please enter email address
            </Warn>
            <Warn
              style={{
                display:
                  !emailRegex.test(email) && submitClicked && email !== ""
                    ? "block"
                    : "none",
                color: "red",
              }}
            >
              Incorrect email
            </Warn>
            <InputField
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Warn
              style={{
                display:
                  warning === "Please enter email and password" &&
                  submitClicked &&
                  password === ""
                    ? "block"
                    : "none",
              }}
            >
              "Please enter password"
            </Warn>
            <Warn
              style={{
                display:
                  warning === "Incorrect password" && submitClicked
                    ? "block"
                    : "none",
              }}
            >
              Wrong password
            </Warn>
            <LogDone
              onClick={() => {
                logg(email, password);
              }}
            >
              Login to your account
            </LogDone>
            <SingDiv>
              <Question>Don’t have an account?</Question>
              <SignUp
                onClick={() => {
                  router.push("/singup");
                }}
              >
                Sing Up
              </SignUp>
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
  @media (min-width: 768px) {
    padding: 88px 184px 470px 184px;
  }
  @media (min-width: 1440px) {
    padding: 80px 520px 250px 520px;
  }
`;

const LogIn = styled(Box)`
  border-radius: 10px;
  background: var(--semi-dark-blue, #161d2f);
  margin-top: 58px;
  width: 100%;
  padding: 24px 24px 32px 24px;
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    margin-top: 72px;
    padding: 32px;
  }
  @media (min-width: 1440x) {
    margin-top: 83px;
  }
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

const Warn = styled(Typography)`
  font-size: 12px;
  font-family: Outfit;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  color: red;
  margin-top: 5px;
  margin-left: 3px;
`;
