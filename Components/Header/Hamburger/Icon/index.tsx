import { CloseOutlined } from "@ant-design/icons";

import styled, { createGlobalStyle } from "styled-components";
import Image from "next/image";
import { useSetHamburgerVisible, useHamburgerVisible } from "../../Provider";
import HamburgerImage from "/assets/common/Header/drawer.png"


export default function Icon() {
  const setHamburgerVisible = useSetHamburgerVisible();
  const hamburgerVisible = useHamburgerVisible();

  return (
    <>
      <GlobalStyle visible={hamburgerVisible.toString()} />
      <IconWrapper onClick={() => setHamburgerVisible((state) => !state)}>
        {hamburgerVisible ? <div style={{ display: "flex", justifyContent: "center" }}><StyledCloseOutlined /> </div> : <Image width={22} height={18} src={HamburgerImage} />}
      </IconWrapper>
    </>
  );
}

// 함수로 작성한 styled component를 선언하세요.
interface IGlobalProps {
  readonly visible: string;
}

const StyledCloseOutlined = styled(CloseOutlined)(({ theme }) => {
  return {
    ["&&"]: {
      fontSize: 20,
    }
  }
})



const IconWrapper = styled.div(({ theme }) => {
  return {
    paddingTop: 5
  };
});

const GlobalStyle = createGlobalStyle<IGlobalProps>(({ visible }) => {
  return {
    ["body"]:
      visible === "true"
        ? {
          overflow: "hidden",
        }
        : {},
    [".layout-header"]:
      visible === "true"
        ? {
          boxShadow: "none !important",
        }
        : {},
  };
});
