// import dependency modules : package.json에 명시된 외부모듈을 선언하세요.
import { Row, Col, Card } from 'antd';
import styled from 'styled-components';

// import global modules : 서비스 전역에서 사용중인 모듈을 선언하세요.
import LoginForm from '@src/Components/LoginForm';

// import local modules : 지역(route)에서 사용중인 모듈을 선언하세요.

export default function Login() {
  return (
    <StyledRow justify="center" align="middle">
      <Col>
        <Card>
          <LoginForm />
        </Card>
      </Col>
    </StyledRow>
  );
}

// 함수로 작성한 styled component를 선언하세요.
const StyledRow = styled(Row)(({ theme }) => ({
  height: '100%',
}));