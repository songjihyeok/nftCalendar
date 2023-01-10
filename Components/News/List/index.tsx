// import dependency modules : package.json에 명시된 외부모듈을 선언하세요.
import { Row, Col, Card, CardProps, Button, Tag, Affix } from 'antd';
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';

// import global modules : 서비스 전역에서 사용중인 모듈을 선언하세요.
import { service, values } from '@src/configs';

// import local modules : 지역(route)에서 사용중인 모듈을 선언하세요.
import {
  useSetVisible,
  useSetSelectedId,
  useData,
  useLoading,
  useHasNextPage,
  useOnRemove,
  useOnLoadMore,
} from '../Provider';

export default function List() {
  const setVisible = useSetVisible();
  const setSelectedId = useSetSelectedId();
  const data = useData();
  const loading = useLoading();
  const hasNextPage = useHasNextPage();
  const onRemove = useOnRemove();
  const onLoadMore = useOnLoadMore();

  return (
    <Row gutter={[0, 15]}>
      {data.map((obj) => {
        const cardProps: CardProps = {
          title: <Title level={4}>{obj.title}</Title>,
          extra: (
            <Row align="middle" gutter={[10, 0]}>
              <Col>
                <Text>{obj.writer}</Text>
              </Col>
              <Col>
                <Button onClick={() => {
                  setVisible(true);
                  setSelectedId(obj.id);
                }}>Edit</Button>
              </Col>
              <Col>
                <Button onClick={() => onRemove(obj.id)}>Delete</Button>
              </Col>
            </Row>
          ),
        };

        return (
          <Col key={obj.id} span={24}>
            <Card {...cardProps}>
              <Row gutter={[15, 0]}>
                <Col xs={24} md={24} lg={12} xl={12} xxl={12}>
                  <img src={`${values.imageUrl}/${service.getValue(obj, 'coverImage', '')}`} style={{ width: '100%' }} />
                </Col>
                <Col xs={24} md={24} lg={12} xl={12} xxl={12}>
                  {obj.content}
                </Col>
                <StyledTagCol span={24}>
                  {service.getValue(obj, 'tags', []).map((tag, i) => <Tag key={i} color="#3e5d8b">{`#${tag}`}</Tag>)}
                </StyledTagCol>
              </Row>
            </Card>
          </Col>
        );
      })}
      <LoadMoreFooter span={24}>
        {hasNextPage ? <LoadMoreButton icon={loading ? <LoadingOutlined spin /> : null} onClick={onLoadMore}>Load more</LoadMoreButton> : <Text>No data</Text>}
      </LoadMoreFooter>
      <StyledAffix>
        <Button icon={<PlusOutlined />} onClick={() => setVisible(true)}>Add news</Button>
      </StyledAffix>
    </Row>
  );
}

// 함수로 작성한 styled component를 선언하세요.
const StyledTagCol = styled(Col)(({ theme }) => ({
  textAlign: 'center',
  paddingTop: 20,
}));

const StyledAffix = styled(Affix)(({ theme }) => ({
  position: 'absolute',
  right: 20,
  bottom: 20,
  backgroundColor: '#1077ff',
  borderRadius: 30,
  padding: '15px 20px',
  boxShadow: '1px 2px 5px 1px grey',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  ['.ant-btn']: {
    backgroundColor: '#1077ff',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    height: 'fit-content',
    border: 'none',
    padding: 0,
    transition: 'all 0.2s ease',
  },
  [':hover']: {
    backgroundColor: '#4c99ff',
    ['.ant-btn']: {
      backgroundColor: '#4c99ff',
    },
  },
}));

const LoadMoreFooter = styled(Col)(({ theme }) => ({
  textAlign: 'center',
}));

const LoadMoreButton = styled(Button)(({ theme }) => ({
  width: '100%',
}));