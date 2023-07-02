"use client";

import styled from "@emotion/styled";
import Desktopmenu from "./components/desktopmenu";
import Menu from "./components/menu";
import { Box, Typography } from "@mui/material";
import Searchbar from "./components/searchbar";
import axios from "axios";
import { useState, useEffect } from "react";
interface Image {
  thumbnail: {
    regular: {
      small: string;
    };
  };
  year: number;
  category: string;
  rating: string;
  title: string;
}

export default function Home() {
  const [images, setImages] = useState<Image[]>([]);
  const [search, setSearch] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const updateImages = images.filter((image) =>
    image.title.toLowerCase().includes(search.toLowerCase())
  );

  const test = async () => {
    const response = await axios.get("http://localhost:3001/home");
    const answer = response.data.getItems;
    setImages(answer);
  };

  useEffect(() => {
    test();
  }, []);

  return (
    <>
      <Main>
        <Menu />
        <Desktopmenu />
        <Searchbar onChange={handleSearch} />
        <Header>Tranding</Header>
        <TrandDiv>image</TrandDiv>
        <Recomended>Recommended for you</Recomended>
        <RecomDiv>
          {updateImages.map((image, index) => (
            <ImageDiv key={index}>
              <GetImage
                src={`http://localhost:3001/images${image.thumbnail.regular.small}`}
              />
              <Description>
                <Year>{image.year}</Year>
                <Dot></Dot>
                <Icon src="icon-nav-movies.svg" />
                <Kind>{image.category}</Kind>
                <Dot></Dot>
                <Age>{image.rating}</Age>
              </Description>
              <Head>{image?.title}</Head>
            </ImageDiv>
          ))}
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
  padding-right: 16px;
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  grid-gap: 15px;
`;

const ImageDiv = styled(Box)`
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;

const GetImage = styled.img`
  max-width: 100%;
  border-radius: 8px;
`;

const Description = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 8px;
  align-items: center;
  margin-left: 2px;
`;

const Year = styled(Typography)`
  color: var(--pure-white, #fff);
  font-size: 14px;
  font-family: Outfit;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

const Dot = styled(Box)`
  width: 2px;
  height: 2px;
  border-radius: 2px;
  opacity: 0.5;
  background: var(--pure-white, #fff);
  margin-left: 6px;
`;
const Icon = styled.img`
  width: 10px;
  height: 10px;
  margin-left: 5px;
`;

const Kind = styled(Typography)`
  color: var(--pure-white, #fff);
  font-size: 14px;
  font-family: Outfit;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  opacity: 0.75;
  margin-left: 6px;
`;

const Age = styled(Typography)`
  color: var(--pure-white, #fff);
  font-size: 14px;
  font-family: Outfit;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin-left: 6px;
`;

const Head = styled.span`
  color: var(--pure-white, #fff);
  font-size: 14px;
  font-family: Outfit;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 2px;
  margin-left: 2px;
`;
