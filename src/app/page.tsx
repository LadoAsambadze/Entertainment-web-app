"use client";

import styled from "@emotion/styled";
import Desktopmenu from "./components/desktopmenu";
import Menu from "./components/menu";
import { Box, Typography } from "@mui/material";
import Searchbar from "./components/searchbar";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [images, setImages] = useState([]);

  const test = async () => {
    const response = await axios.get("http://localhost:3001/home");
    const answer = response.data.getItems;
    setImages(answer);
  };

  return (
    <>
      <Main>
        <Menu />
        <Desktopmenu />
        <Searchbar />
        <Header>Tranding</Header>
        <TrandDiv>image</TrandDiv>
        <Recomended>Recommended for you</Recomended>
        <RecomDiv>
          <ImageDiv></ImageDiv>
          <img src="http://localhost:3001/images/the-great-lands/regular/small.jpg" />
        </RecomDiv>
      </Main>
    </>
  );
}

const Main = styled(Box)`
  display: flex;
  flex-direction: column;
  background: var(--dark-blue, #10141e);
  width: 100%;
  min-height: 100vh;
  @media (min-width: 768px) {
    padding: 25px;
  }
  @media (min-width: 1440px) {
    padding: 32px;
  }
`;

const Header = styled(Typography)`
  color: var(--pure-white, #fff);
  font-size: 20px;
  font-family: Outfit;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: -0.312px;
  padding-left: 16px;
`;

const TrandDiv = styled(Box)`
  width: 100%;
  padding-left: 16px;
  margin-top: 16px;
`;

const Recomended = styled(Typography)`
  color: var(--pure-white, #fff);
  font-size: 20px;
  font-family: Outfit;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: -0.312px;
  padding-left: 16px;
  margin-top: 24px;
`;

const RecomDiv = styled(Box)`
  width: 100%;
  padding-left: 16px;
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(1, 1fr);
  grid-gap: 15px;
`;

const ImageDiv = styled(Box)`
  width: 100%;
  height: 100px;
  background: url("./assets/thumbnails/the-great-lands/regular/small.jpg");
`;
