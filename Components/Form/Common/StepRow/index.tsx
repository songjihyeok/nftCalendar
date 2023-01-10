// import dependency modules : package.json에 명시된 외부모듈을 선언하세요.
import { Row, Col } from "antd";
import styled from "styled-components";

// import global modules : 서비스 전역에서 사용중인 모듈을 선언하세요.

// import local modules : 지역(route)에서 사용중인 모듈을 선언하세요.

export default function StepRow(children) {
  return <StepRowRow>{children}</StepRowRow>;
}

// 함수로 작성한 styled component를 선언하세요.
const StepRowRow = styled(Row)(({ theme }) => {
  return {
    maxWidth: 450,
    margin: "0 auto",
    paddingTop: 50,
    paddingBottom: 50,
  };
});
