"use client";

import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { useState } from "react";

export default function Desktopmenu({ theme, setTheme, book, setBook }: any) {
  const [clicked, setClicked] = useState(false);
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
            src="icon-bookmark-full.svg"
            onClick={() => {
              setBook(true);
              setClicked(true);
            }}
            style={{ filter: clicked ? "brightness(100%)" : "brightness(50%)" }}
          />
        </IconBox>
        <Avatar src="image-avatar.png" />
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
  height: 40px;
  width: 40px;
  cursor: pointer;
`;
