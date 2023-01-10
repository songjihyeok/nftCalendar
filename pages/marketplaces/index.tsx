// import dependency modules : package.json에 명시된 외부모듈을 선언하세요.
import { Row, Col, Typography } from 'antd';
import styled from 'styled-components';
import MarketList from "@src/Components/MarketList"
import Advertise from "@src/Components/Advertise"
import Footer from "@src/Components/Footer";
import { useResponse } from "@src/Components/Common/Provider/isMobile";
const { Title, Text } = Typography;


export default function Marketplaces() {
  const isMobile = useResponse();
  return (
    <>
      <Row >
        <MarketPlaceCol span={24}>
          <MainTitle level={1}>Market places</MainTitle>
          <StyledSearchPageRow gutter={[30, isMobile ? 30 : 0]} >
            <Col span={24} lg={18}>
              <MarketList></MarketList>
            </Col>
            {!isMobile ?
              <Col span={6}>
                <Advertise></Advertise>
              </Col> : null
            }
          </StyledSearchPageRow>
        </MarketPlaceCol>
      </Row>
      <Footer></Footer>
    </>
  );
}

const StyledSearchPageRow = styled(Row)(({ theme }) => {
  return {
    minHeight: 900,

    [`@media (max-width: ${theme.mobileMedia})`]: {
      minHeight: 500
    }
  }
})


// 함수로 작성한 styled component를 선언하세요.
const MarketPlaceCol = styled(Col)(({ theme }) => {
  return {
    maxWidth: 1250,
    margin: "0 auto",
    paddingBottom: 50,
    [`@media (max-width: ${theme.mobileMedia})`]: {
      maxWidth: "92%",
    },
  }
})


const MainTitle = styled(Title)(({ theme }) => {
  return {
    ["&&"]: {
      textAlign: "center",
      color: theme.mainTextColor,
      marginTop: 23,
      marginBottom: 23,
    },
  };
});