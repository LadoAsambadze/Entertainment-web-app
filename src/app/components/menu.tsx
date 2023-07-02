"use client";
import React from "react";
import { Box } from "@mui/material";
import styled from "@emotion/styled";

export default function Menu() {
  return (
    <>
      <Main>
        <Logo src="logo.svg" />
        <IconBox>
          <Image src="icon-nav-home.svg" />
          <Image src="icon-category-movie.svg" />
          <Image src="icon-category-tv.svg" />
          <Image src="icon-bookmark-full.svg" />
        </IconBox>
        <Avatar src="image-avatar.png" />
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
  height: 24px;
  width: 24px;
  cursor: pointer;
`;
