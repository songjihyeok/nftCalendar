// import dependency modules : package.json에 명시된 외부모듈을 선언하세요.
import { Row, Col, Card, Typography, Divider } from 'antd';
import styled from 'styled-components';
import Image from "next/image"
import Opensea from "/assets/common/market/opensea.png"
import { useRouter } from 'next/router';

const { Title, Text } = Typography

export default function MarketCard({ card, cardData }) {
  const router = useRouter()

  const onRoute = () => {
    window.open(card.link, '_blank')
  }

  const onClickCard = (titleId) => {
    router.push(`/calendar/${titleId}`)
  }


  return (
    <MarketCardWrapper>
      <Row gutter={[30, 0]}>
        <Col span={24} lg={12} onClick={onRoute} style={{ cursor: "pointer" }}>
          <Image src={card.image} ></Image>
        </Col>
        <Col span={12} style={{ display: "flex", justifyContent: "space-around", flexDirection: "column" }}>
          <div>
            <Title level={3}>{card.title}</Title>
            <Title level={5} style={{ marginBottom: 20 }}> Upcoming Events</Title>
          </div>
          <div>
            {cardData.map(element => {
              return (
                <Row style={{ marginBottom: 10, cursor: "pointer" }} onClick={() => onClickCard(element.titleId)}>
                  <Col span={24}><Text>{element.title}</Text></Col>
                </Row>
              )
            })}

          </div>


        </Col>
      </Row>
    </MarketCardWrapper >
  );
}

// 함수로 작성한 styled component를 선언하세요.
const MarketCardWrapper = styled(Card)(({ theme }) => {
  return {
    marginBottom: 30

  };
});

