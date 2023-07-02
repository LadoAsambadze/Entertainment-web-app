"use client";

import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { Input } from "@mui/material";


export default function Searchbar({ onChange }: { onChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <>
      <Main>
        <Search src="icon-search.svg" alt="search logo" />
        <SearchType placeholder="Search for movies or TV series" onChange={onChange} />
      </Main>
    </>
  );
}


const Main = styled(Box)`
  width: 100%;
  padding: 24px 16px 24px 16px;
  display: flex;
  flex-direction: row;
  margin-top: 56px;
  align-items: center;
  @media (min-width: 768px) {
    margin-top: 70px;
    padding: 34px 24px 34px 24px;
  }
  @media (min-width: 1440px) {
    margin-top: 0px;
    padding: 20px 0px 35px 130px;
  }
`;

const Search = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
  @media (min-width: 1440px) {
    width: 32px;
    height: 32px;
  }
`;
const SearchType = styled(Input)`
  width: 100%;
  margin-left: 16px;
  color: var(--pure-white, #fff);
  font-size: 16px;
  font-family: Outfit;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  border-bottom: none;
  padding-bottom: 4px;
  border-bottom: 0;
  @media (min-width: 768px) {
    padding-bottom: 7px;
  }
  @media (min-width: 1440px) {
    font-size: 24px;
    padding-bottom: 10px;
  }
`;

