// import dependency modules : package.json에 명시된 외부모듈을 선언하세요.
import { Layout as AntDesignLayout } from "antd";
import styled from "styled-components";

import HeadInfo from "@src/Components/HeadInfo";
import Header from "@src/Components/Header";
import Footer from "@src/Components/Footer";
// import global modules : 서비스 전역에서 사용중인 모듈을 선언하세요.

// import local modules : 지역(route)에서 사용중인 모듈을 선언하세요.

const { Content } = AntDesignLayout;

export default function Layout({ children }) {
  return (
    <AntDesignLayout>
      <HeadInfo></HeadInfo>
      <Header></Header>
      <StyledContent>{children}</StyledContent>
    </AntDesignLayout>
  );
}

// 함수로 작성한 styled component를 선언하세요.

const StyledContent = styled(Content)(({ theme }) => {
  return {
    ["&&"]: {
      marginTop: 69,
      minHeight: "calc(100vh)",
      background: "#e8eef6",
    },
  };
});
