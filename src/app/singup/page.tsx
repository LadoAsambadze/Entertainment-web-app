"use client";

import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { Input } from "@mui/material";
import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface AxiosError extends Error {
  response: {
    data: {
      message: string;
    };
  };
}

export default function Singup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");
  const [warning, setWarning] = useState("");
  const [submitClicked, setSubmitClicked] = useState(false);
  const [avatar, setAvatar] = useState<File | undefined>();
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})$/;

  const register = async (
    email: string,
    password: string,
    avatar: File | undefined
  ) => {
    setSubmitClicked(true);
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    if (avatar) {
      formData.append("avatar", avatar);
    }

    if (
      email !== "" &&
      password !== "" &&
      repeat !== "" &&
      emailRegex.test(email)
    ) {
      if (repeat === password) {
        try {
          const response = await axios.post(
            "http://localhost:3001/singup",
            formData
          );
          console.log(formData);

          router.push("/");
        } catch (error) {
          setWarning((error as AxiosError).response.data.message);
        }
      } else {
        setWarning("Passwords dont matches");
      }
    }
  };
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAvatar(e.target.files[0]);
    }
  };

  return (
    <>
      <Main>
        <Image alt="icon" src="logo.svg" />
        <LogIn>
          <Header>Sing Up</Header>
          <Form>
            <InputField
              placeholder="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Warn
              style={{
                display: email === "" && submitClicked ? "block" : "none",
                color: "red",
              }}
            >
              Please enter your email address.
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

            <Warn
              style={{
                display: warning === "Email already exists" ? "block" : "none",
                color: "red",
              }}
            >
              Email adress already exist
            </Warn>

            <InputField
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Warn
              style={{
                display: password === "" && submitClicked ? "block" : "none",
                color: "red",
              }}
            >
              Please enter your password.
            </Warn>
            <InputField
              placeholder="Repeat Password"
              onChange={(e) => setRepeat(e.target.value)}
            />
            <Warn
              style={{
                display: repeat === "" && submitClicked ? "block" : "none",
                color: "red",
              }}
            >
              Please confirm your password.
            </Warn>
            <Warn
              style={{
                display:
                  warning === "Passwords dont matches" && password !== repeat
                    ? "block"
                    : "none",
                color: "red",
              }}
            >
              Passwords don't match
            </Warn>

            <input
              style={{
                marginTop: "20px",
                background: "#898e9d",
                padding: "10px",
                borderRadius: "5px",
              }}
              type="file"
              name="file"
              onChange={handleFileChange}
            />

            <LogDone
              type="submit"
              onClick={() => {
                register(email, password, avatar);
              }}
            >
              Create an account
            </LogDone>
            <SingDiv>
              <Question>Alread have an account?</Question>
              <SignUp
                onClick={() => {
                  router.push("/");
                }}
              >
                Login
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
  overflow-y: none;
  @media (min-width: 768px) {
    padding: 88px 184px 420px 184px;
  }
  @media (min-width: 1440px) {
    padding: 80px 520px 205px 520px;
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
