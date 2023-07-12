"use client";
import React from "react";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
interface avt {
  avatar: string;
}
export default function Menu({ theme, setTheme, setBook }: any) {
  const [clicked, setClicked] = useState(false);
  const [info, setInfo] = useState<avt>();
  const [out, setOut] = useState(false);
  const router = useRouter();
  const funct = async () => {
    const cookieToken = getCookie("token");
    if (cookieToken) {
      const response = await axios.get("http://localhost:3001/profile", {
        headers: {
          authorization: `Bearer ${cookieToken}`,
        },
      });
      setInfo(response.data);
    }
  };
  useEffect(() => {
    funct();
  }, []);

  return (
    <>
      <Main>
        <Logo
          onClick={() => {
            setTheme("");
            setBook(false);
            setClicked(false);
          }}
          src="logo.svg"
          alt="icon"
        />
        <IconBox>
          <Image
           alt="icon"
            src="icon-nav-home.svg"
            onClick={() => {
              setTheme("");
              setBook(false);
              setClicked(false);
            }}
            style={{
              filter:
                theme === "" && !clicked
                  ? " brightness(100%)"
                  : " brightness(50%)",
            }}
          />
          <Image
           alt="icon"
            src="icon-category-movie.svg"
            onClick={() => {
              setTheme("Movie");
              setBook(false);
              setClicked(false);
            }}
            style={{
              filter:
                theme === "Movie" && !clicked
                  ? " brightness(100%)"
                  : " brightness(50%)",
            }}
          />
          <Image
           alt="icon"
            src="icon-category-tv.svg"
            onClick={() => {
              setTheme("TV Series");
              setBook(false);
              setClicked(false);
            }}
            style={{
              filter:
                theme === "TV Series" && !clicked
                  ? " brightness(100%)"
                  : " brightness(50%)",
            }}
          />
          <Image
           alt="icon"
            src="icon-bookmark-full.svg"
            onClick={() => {
              setBook(true);
              setClicked(true);
            }}
            style={{ filter: clicked ? "brightness(100%)" : "brightness(50%)" }}
          />
        </IconBox>
        <Avatar
         alt="avatar"
          style={{ display: out ? "none" : "block" }}
          onClick={() => setOut(true)}
          src={`http://localhost:3001${info?.avatar}`}
        />
        <LogOut
          onClick={() => {
            router.push("/");
            deleteCookie("token");
          }}
          style={{ display: out ? "block" : "none" }}
        >
          Log Out
        </LogOut>
      </Main>
    </>
  );
}

const Main = styled(Box)`
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: row;
  background: var(--semi-dark-blue, #161d2f);
  position: fixed;
  @media (min-width: 768px) {
    padding: 22px;
    width: 95%;
  }
  @media (min-width: 1440px) {
    display: none;
  }
`;

const Logo = styled.img`
  width: 25px;
  height: 20px;
  cursor: pointer;
`;
const Image = styled.img`
  height: 16px;
  cursor: pointer;
  filter: brightness(50%);
  &:hover {
    filter: brightness(100%);
  }
`;

const IconBox = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 16px;
  padding-left: 22%;
  padding-right: 22%;
  width: 100%;
  @media (min-width: 768px) {
    padding-left: 35%;
    padding-right: 35%;
  }
`;

const Avatar = styled.img`
  height: 32px;
  width: 40px;
  cursor: pointer;
  border-radius: 8px;
`;

const LogOut = styled.button`
  background: #e87979;
  color: white;
  padding: 4px;

  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 8px;
  padding-left: 18px;
  padding-right: 18px;
`;
