// import dependency modules : package.json에 명시된 외부모듈을 선언하세요.
import { Row, Col, Typography } from "antd";
import styled from "styled-components";
import Image from "next/image";
// import global modules : 서비스 전역에서 사용중인 모듈을 선언하세요.

// import local modules : 지역(route)에서 사용중인 모듈을 선언하세요.
import MainTitleSection from "./MainTitleSection";
import FeaturedSection from "./FeaturedSection";
import SearchSection from "../SearchSection";


function Home() {

  return (
    <HomeRow>
      <HomeCol span={24}>
        <MainTitleSection></MainTitleSection>
        <FeaturedSection></FeaturedSection>
        <SearchSection></SearchSection>
      </HomeCol>
    </HomeRow>
  );
}



const HomeRow = styled(Row)(({ theme }) => {
  return {
    height: "100%",
  };
});

const HomeCol = styled(Col)(({ theme }) => {
  return {
    paddingTop: 89,
    height: "100%",
    // maxWidth: "80%",
    maxWidth: 1250,
    margin: "0 auto",
    [`@media (max-width: ${theme.mobileMedia})`]: {
      maxWidth: "92%",
      paddingTop: 40,
      paddingBottom: 41,
    },
  };
});

export default Home

