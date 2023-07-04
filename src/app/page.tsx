"use client";

import styled from "@emotion/styled";
import Desktopmenu from "./components/desktopmenu";
import Menu from "./components/menu";
import { Box, Typography } from "@mui/material";
import Searchbar from "./components/searchbar";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { keyframes } from "@emotion/react";
interface Image {
  thumbnail: {
    regular: {
      small: string;
      medium: string;
      large: string;
    };
  };
  year: number;
  category: string;
  rating: string;
  title: string;
  isBookmarked: boolean;
  isTrending: boolean;
  id: string;
}

type InnerDivProps = {
  drag?: boolean | "x" | "y";
  dragConstraints?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
};

interface FinalImageProps {
  imageSrc: string;
  imageSrcMedium: string;
  imageSrcLarge: string;
}

export default function Home() {
  const [images, setImages] = useState<Image[]>([]);
  const [search, setSearch] = useState("");
  const [width, setWidth] = useState(1000);
  const [theme, setTheme] = useState("");
  const [book, setBook] = useState(false);
  const [animate, setAnimate] = useState(true);
  const [extra, setExtra] = useState(false);
  const carousel = useRef<HTMLDivElement | null>(null);
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const updateImages = images.filter((image) =>
    book
      ? image.isBookmarked === book &&
        image.title.toLowerCase().includes(search.toLowerCase())
      : image.title.toLowerCase().includes(search.toLowerCase()) &&
        image.category.toLowerCase().includes(theme.toLowerCase())
  );
  const updateTrending = images.filter((image) => image.isTrending === true);

  const test = async () => {
    const response = await axios.get("http://localhost:3001/home");
    const res = response.data.getItems;
    setImages(res);
  };

  useEffect(() => {
    test();
    const timeout = setTimeout(() => setAnimate(false), 2000);
    return () => clearTimeout(timeout);
  }, [extra]);

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, [images]);

  const toggleBook = async (title: string) => {
    const response = await axios.put(`http://localhost:3001/bookmark/${title}`);
    setExtra(!extra);
  };
  console.log(images);

  return (
    <>
      <Main>
        <Menu theme={theme} setTheme={setTheme} setBook={setBook} />
        <Desktopmenu
          theme={theme}
          setTheme={setTheme}
          book={book}
          setBook={setBook}
        />
        <Searchbar onChange={handleSearch} />
        <Header>Tranding</Header>
        <TrandDiv ref={carousel} as={motion.div}>
          <InnerDiv drag="x" dragConstraints={{ right: 0, left: -width }}>
            {updateTrending.map((image, index) => {
              return (
                <ImageBox as={motion.div} key={index}>
                  <FinalImage
                    imageSrc={`http://localhost:3001/images${image.thumbnail.regular.small}`}
                    imageSrcMedium={`http://localhost:3001/images${image.thumbnail.regular.medium}`}
                    imageSrcLarge={`http://localhost:3001/images${image.thumbnail.regular.large}`}
                  >
                    <BookmarkDiv>
                      <Circle
                        onClick={() => {
                          toggleBook(image.title);
                          console.log(image.title);
                        }}
                      >
                        <BookImg
                          src={
                            image.isBookmarked
                              ? "icon-bookmark-full.svg"
                              : "icon-bookmark-empty.svg"
                          }
                        />
                      </Circle>
                    </BookmarkDiv>
                    <Description>
                      <Year>{image.year}</Year>
                      <Dot></Dot>
                      <Icon src="icon-nav-movies.svg" />
                      <Kind>{image.category}</Kind>
                      <Dot></Dot>
                      <Age>{image.rating}</Age>
                    </Description>
                    <Head>{image.title}</Head>
                  </FinalImage>
                </ImageBox>
              );
            })}
          </InnerDiv>
        </TrandDiv>
        <Recomended>Recommended for you</Recomended>
        <RecomDiv>
          {updateImages.map((image, index) => (
            <ImageDiv key={index}>
              <picture>
                <source
                  media="(min-width: 1440px)"
                  srcSet={`http://localhost:3001/images${image.thumbnail.regular.large}`}
                />
                <source
                  media="(min-width: 768px)"
                  srcSet={`http://localhost:3001/images${image.thumbnail.regular.medium}`}
                />
                <GetImage
                  src={`http://localhost:3001/images${image.thumbnail.regular.small}`}
                  alt="Image"
                />
              </picture>
              <Description>
                <Year>{image.year}</Year>
                <Dot></Dot>
                <Icon src="icon-nav-movies.svg" />
                <Kind>{image.category}</Kind>
                <Dot></Dot>
                <Age>{image.rating}</Age>
              </Description>
              <Head>{image.title}</Head>
              <BookmarkDivTwo>
                <Circle
                  onClick={() => {
                    toggleBook(image.title);
                    console.log(image.title);
                  }}
                >
                  <BookImg
                    src={
                      image.isBookmarked
                        ? "icon-bookmark-full.svg"
                        : "icon-bookmark-empty.svg"
                    }
                  />
                </Circle>
              </BookmarkDivTwo>
            </ImageDiv>
          ))}
        </RecomDiv>
      </Main>
    </>
  );
}

const common = keyframes`
  from {
    scale: 0.8;
  
  }
  to {
    scale: 1;
 
 
  }
`;

const trend = keyframes`
  from {
   
    transform: translateX(100%)
  }
  to {
    
    transform: translateX(0%);
  }
`;

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
  @media (min-width: 1440px) {
    padding-left: 130px;
  }
`;

const TrandDiv = styled.div`
  padding-left: 16px;
  margin-top: 16px;
  cursor: grab;

  overflow: hidden;
  @media (min-width: 1440px) {
    margin-left: 110px;
  }
`;
const InnerDiv = styled(motion.div)<InnerDivProps>`
  display: flex;
`;

const ImageBox = styled.div`
  min-height: 140px;
  min-width: 240px;
  padding: 8px;

  @media (min-width: 768px) {
    min-width: 470px;
    min-height: 230px;
    flex-shrink: 0;
  }
`;

const FinalImage = styled.div<FinalImageProps>`
  border-radius: 8px;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.imageSrc});
  background-size: cover;
  background-position: center;
  padding: 8px 8px 16px 16px;
  animation: ${trend} 1.8s ease-out;
  @media (min-width: 768px) {
    background-image: url(${(props) => props.imageSrcMedium});
    padding: 16px 24px 24px 24px;
  }
  @media (min-width: 1440px) {
    background-image: url(${(props) => props.imageSrcLarge});
  }
`;

const BookmarkDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 46px;
  @media (min-width: 768px) {
    margin-bottom: 106px;
  }
`;
const BookmarkDivTwo = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  right: 8px;
  top: 8px;
  position: absolute;
  @media (min-width: 768px) {
    right: 16px;
    top: 16px;
  }
`;

const Circle = styled.div`
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  background: #10141e;
  border-radius: 100%;
  opacity: 0.7;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const BookImg = styled.img`
  cursor: pointer;
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
  @media (min-width: 1440px) {
    padding-left: 130px;
  }
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
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 30px;
  }
  @media (min-width: 1440px) {
    padding-left: 130px;
    column-gap: 40px;
    row-gap: 28px;
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ImageDiv = styled(Box)`
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const GetImage = styled.img`
  max-width: 100%;
  border-radius: 8px;
  animation: ${common} 1s ease-out;
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
  opacity: 0.75;
  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

const Dot = styled(Box)`
  width: 2px;
  height: 2px;
  border-radius: 2px;
  opacity: 0.5;
  background: var(--pure-white, #fff);
  margin-left: 6px;
  opacity: 0.75;
  @media (min-width: 768px) {
    width: 3px;
    height: 3px;
  }
`;
const Icon = styled.img`
  width: 10px;
  height: 10px;
  margin-left: 5px;
  opacity: 0.75;

  @media (min-width: 768px) {
    width: 12px;
    height: 12px;
    margin-left: 7px;
  }
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
  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

const Age = styled(Typography)`
  color: var(--pure-white, #fff);
  font-size: 14px;
  font-family: Outfit;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin-left: 6px;
  opacity: 0.75;
  @media (min-width: 768px) {
    font-size: 18px;
  }
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
  @media (min-width: 768px) {
    font-size: 18px;
  }
`;
