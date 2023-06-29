"use client";

import styled from "@emotion/styled";
import Desktopmenu from "./components/desktopmenu";
import Menu from "./components/menu";
import { Box, Typography } from "@mui/material";
import Searchbar from "./components/searchbar";

export default function Home() {
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
          <div>qegqgq</div>
          <div>qegqegqe</div>
          <div>qegqgq</div>
          <div>qegqegqe</div>
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
