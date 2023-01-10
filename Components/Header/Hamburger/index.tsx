// import dependency modules : package.json에 명시된 외부모듈을 선언하세요.
import { Row, Col } from "antd";
import styled from "styled-components";
import HamburgerDrawer from "./Drawer";
import HamburgerIcon from "./Icon";

export default function Hamburger() {
  return (
    // <HamburgerRow>
    //   <Col>
    <>
      <HamburgerDrawer />
      <HamburgerIcon />
    </>
    // </HamburgerRow>
  );
}

// 함수로 작성한 styled component를 선언하세요.
const HamburgerRow = styled(Row)(({ theme }) => {
  return {};
});
