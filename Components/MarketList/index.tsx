// import dependency modules : package.json에 명시된 외부모듈을 선언하세요.
import { Row, Col } from 'antd';
import styled from 'styled-components';
import MarketCard from "./MarketCard"
import { values } from "./configs"
import { nest } from "@src/configs"
import { Provider, useData } from "./Provider"
import { service } from '@src/configs'
import { useResponse } from "@src/Components/Common/Provider/isMobile";
function MarketList() {
  const marketsData = useData()
  const isMobile = useResponse();
  return (
    <MarketplacesRow gutter={[0, isMobile ? 30 : 0]}>
      <Col span={24}>
        {values.marketCards.map((card) => {

          const cardData = service.getValue(marketsData, `${card.id}`, [])

          return <MarketCard key={card.key} card={card} cardData={cardData}></MarketCard>
        })}

      </Col>
    </MarketplacesRow>
  );
}

// 함수로 작성한 styled component를 선언하세요.
const MarketplacesRow = styled(Row)(({ theme }) => {
  return {};
});

export default nest(Provider, MarketList)


