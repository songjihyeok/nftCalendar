// import dependency modules : package.json에 명시된 외부모듈을 선언하세요.
import { Row, Col, Typography } from "antd";
import styled from "styled-components";
import { useResponse } from "@src/Components/Common/Provider/isMobile";
import { values } from "./configs";
import NFTCard from "./NFTCard";
import { useData } from "../Provider"

const { Title, Paragraph, Text } = Typography;

export default function FeaturedSection() {

  const data = useData()
  const isMobile = useResponse();
  const FeaturedData = data.slice(6, 12)

  return (
    <FeaturedSectionRow>
      <Col span={24}>
        <MainTitle>{values.values.main.title}</MainTitle>
        <SubTitle level={5}>{values.values.main.subTitle}</SubTitle>

        <CardsWrapperRow gutter={[isMobile ? 0 : 15, 15]}>
          {FeaturedData.map((featured, index) => {
            return <Col span={24} lg={8} key={index}>
              <NFTCard data={featured}></NFTCard>
            </Col>
          })}
        </CardsWrapperRow>
      </Col>
    </FeaturedSectionRow>
  );
}

const CardsWrapperRow = styled(Row)(({ theme }) => {
  return {
    ["&&"]: {},
  };
});

const FeaturedSectionRow = styled(Row)(({ theme }) => {
  return {
    paddingTop: 121,
    margin: "0 auto",
    [`@media (max-width: ${theme.mobileMedia})`]: {
      paddingTop: 50,
    },
  };
});

const MainTitle = styled(Title)(({ theme }) => {
  return {
    ["&&"]: {
      textAlign: "center",
      color: theme.mainTextColor,
      marginBottom: 23,
      [`@media (max-width: ${theme.mobileMedia})`]: {
        fontSize: 30,
      },
    },
  };
});

const SubTitle = styled(Title)(({ theme }) => {
  return {
    ["&&"]: {
      color: theme.subTextColor,
      textAlign: "center",
      marginBottom: 80,
      [`@media (max-width: ${theme.mobileMedia})`]: {
        marginBottom: 50,
        fontSize: 15,
      },
    },
  };
});
