// import dependency modules : package.json에 명시된 외부모듈을 선언하세요.
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { Row, Col, Card, CardProps, Button, Descriptions, Tag } from 'antd';
import Title from 'antd/lib/typography/Title';
import styled from 'styled-components';
import dayjs from 'dayjs';

// import global modules : 서비스 전역에서 사용중인 모듈을 선언하세요.
import { service, nest, values as commonValues } from '@src/configs';

// import local modules : 지역(route)에서 사용중인 모듈을 선언하세요.
import { useSetVisible } from '../Provider';
import { values } from './configs';
import { Provider, useSelectedData } from './Provider';

function Detail() {
  const { back } = useRouter();
  const selectedData = useSelectedData();
  const setVisible = useSetVisible();

  const DataDescriptions = useCallback(({ data }): JSX.Element => {
    return (
      <StyledDescriptions column={1}>
        {service.getValue(values, 'descriptions', []).map(({ key, label }) => {
          if (['isPromoted', 'isVerified', "isVisible"].includes(key)) {
            return (
              <Descriptions.Item key={key} label={label}>
                {service.getValue(data, key, false) ? 'Y' : 'N'}
              </Descriptions.Item>
            );
          }

          if (key === 'startEndDateTime') {
            return (
              <Descriptions.Item key={key} label={label}>
                {dayjs(service.getValue(data, 'startDateTime', '')).format('YYYY-MM-DD')} ~ {dayjs(service.getValue(data, 'endDateTime', '')).format('YYYY-MM-DD')}
              </Descriptions.Item>
            );
          }

          if (key === 'tags') {
            return (
              <Descriptions.Item key={key} label={label}>
                {service.getValue(data, key, []).map((tag, i) => <Tag key={i} color="#3e5d8b">{`#${tag}`}</Tag>)}
              </Descriptions.Item>
            );
          }
          if (key === 'description') {
            return (
              <Descriptions.Item key={key} label={label}>
                {decodeURIComponent(service.getValue(data, "description", ""))}
              </Descriptions.Item>
            );
          }

          // decodeURIComponent()

          return (
            <Descriptions.Item key={key} label={label}>
              {service.getValue(data, key, '')}
            </Descriptions.Item>
          );
        })}
      </StyledDescriptions>
    );
  }, []);

  const cardProps: CardProps = {
    title: <Title level={3}>{service.getValue(selectedData, 'title', '')}</Title>,
    extra: (
      <Row gutter={[10, 0]}>
        <Col>
          <Button onClick={() => setVisible(true)}>Edit</Button>
        </Col>
        <Col>
          <Button type="primary" onClick={back}>Back</Button>
        </Col>
      </Row>
    ),
  };

  return (
    <Card {...cardProps}>
      <Row gutter={[100, 0]}>
        <Col span={12}>
          {selectedData && <img src={`${commonValues.imageUrl}/${service.getValue(selectedData, 'coverImage', '')}`} style={{ width: '100%' }} />}
        </Col>
        <Col span={12}>
          <DataDescriptions data={selectedData} />
        </Col>
      </Row>
    </Card>
  );
}

export default nest(Provider, Detail);

// 함수로 작성한 styled component를 선언하세요.
const StyledDescriptions = styled(Descriptions)(({ theme }) => ({
  ['.ant-descriptions-item']: {
    paddingBottom: 5,
  },
}));

