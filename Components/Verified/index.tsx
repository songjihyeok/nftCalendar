// import dependency modules : package.json에 명시된 외부모듈을 선언하세요.
import { Row, Col, Typography } from "antd";
import styled from "styled-components";
import { CheckOutlined } from "@ant-design/icons";

// import global modules : 서비스 전역에서 사용중인 모듈을 선언하세요.

// import local modules : 지역(route)에서 사용중인 모듈을 선언하세요.

const { Text, Title } = Typography;

export default function Verified() {
  return (
    <VerifiedRow gutter={[5, 0]}>
      <Col>
        <CheckWrapper>
          <StyledCheckOutlined />
        </CheckWrapper>
      </Col>
      <Col>
        <VerifiedTitle level={5}>verified</VerifiedTitle>
      </Col>
    </VerifiedRow>
  );
}

// 함수로 작성한 styled component를 선언하세요.

const VerifiedRow = styled(Row)(({ theme }) => {
  return {
    display: "flex",
    alignItems: "center",
  };
});

const CheckWrapper = styled.span(({ theme }) => {
  return {
    width: 16,
    height: 16,
    background: "#3985d3",
    borderRadius: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
});

const VerifiedTitle = styled(Title)(({ theme }) => {
  return {
    ["&&"]: {
      color: "#555555",
      marginBottom: 0,
    },
  };
});

const StyledCheckOutlined = styled(CheckOutlined)(({ theme }) => {
  return {
    color: "white",
    fontSize: 12,
  };
});
