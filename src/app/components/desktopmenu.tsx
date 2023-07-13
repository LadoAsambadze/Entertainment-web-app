"use client";

import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
interface avt {
  avatar: string;
}

export default function Desktopmenu({ theme, setTheme, setBook }: any) {
  const [clicked, setClicked] = useState(false);
  const [info, setInfo] = useState<avt>();
  const router = useRouter();
  const funct = async () => {
    const cookieToken = getCookie("token");
    if (cookieToken) {
      const response = await axios.get(
        "https://entertainment-app-back-production.up.railway.app/profile",
        {
          headers: {
            authorization: `Bearer ${cookieToken}`,
          },
        }
      );
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
          alt="logo"
        />
        <IconBox>
          <Image
            src="icon-nav-home.svg"
            alt="icon"
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

        <Avatar alt="avatar" src={`https://entertainment-web-5rrfft7kx-ladoasambadze.vercel.app/${info?.avatar}`} />
        <LogOut
          onClick={() => {
            deleteCookie("token");
            router.push("/");
          }}
        >
          Log Out
        </LogOut>
      </Main>
    </>
  );
}

const Main = styled(Box)`
  display: none;
  @media (min-width: 1440px) {
    position: absolute;
    width: 100px;
    height: 960px;
    border-radius: 20px;
    background: var(--semi-dark-blue, #161d2f);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 35px;
    padding-bottom: 35px;
  }
`;

const Logo = styled.img`
  width: 32px;
  height: 25px;
  cursor: pointer;
`;

const IconBox = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: 130px;
  padding-bottom: 500px;
  justify-content: space-between;
`;
const Image = styled.img`
  height: 20px;
  width: 20px;
  cursor: pointer;
  filter: brightness(50%);
  &:hover {
    filter: brightness(100%);
  }
`;

const Avatar = styled.img`
  height: 80px;
  width: 80px;
  cursor: pointer;
  border-radius: 10px;
`;

const LogOut = styled.button`
  background: #d17272;
  color: black;
  padding: 4px;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
