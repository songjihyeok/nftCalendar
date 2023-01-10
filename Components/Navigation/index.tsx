// import dependency modules : package.json에 명시된 외부모듈을 선언하세요.
import { useState, useEffect } from "react";
import { Row, Col, Menu } from "antd";
import styled from "styled-components";
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router";
import { values } from "@src/Components/Navigation/configs";
import { Ioption, Imenu } from "./configs/types"

const star = "/assets/common/icons/star.png"

const { SubMenu } = Menu;

export default function Navigation() {
  const [current, setCurrent] = useState([]);
  const router = useRouter();
  const path = router.pathname


  const onOpenLink = (link: string) => {
    window.open(link, '_blank')
  }

  const handleClick = (value) => {
    console.log("value", value)
    setCurrent([value])
  }


  return (
    <StyledMenu

      mode="horizontal"
    >
      {values.values.menu.map((element: Imenu, index: number) => {
        return (
          <StyledSubMenu title={element.mainTitle} key={element.key}>
            {element.sideTitle.map((option: Ioption, index: number) => {

              if (option.key === "featured") {
                return (
                  <StyledMenuItem>
                    <Link href={`${option.link}`} key={option.key}>
                      <StyledAtag href={`${option.link}`}>
                        <Row>
                          <Col>
                            {option.name}
                          </Col>
                          <StarImageCol>
                            <Image src={star} width="15" height="15"></Image>
                          </StarImageCol>
                        </Row>
                      </StyledAtag>
                    </Link>
                  </StyledMenuItem>
                );
              }

              if (option.key === "discord" || option.key === "twitter") {
                return (
                  <StyledMenuItem key={option.key} onClick={() => onOpenLink(option.link)}>
                    <StyledAtag href={`${option.link}`} target='_blank'>{option.name} </StyledAtag>
                  </StyledMenuItem>
                );
              }


              return (

                <StyledMenuItem key={option.key}>
                  <Link href={`${option.link}`}>
                    <StyledAtag href={`${option.link}`}>
                      {option.name}
                    </StyledAtag>
                  </Link>
                </StyledMenuItem>

              );
            })}
          </StyledSubMenu>
        );
      })}
    </StyledMenu>
  );
}
const StyledMenu = styled(Menu)(({ theme }) => {
  return {
    background: "#e8eef6",
    color: "#123b77",
    marginLeft: 85,
    width: "100%",
  };
});

const StarImageCol = styled(Col)(({ theme }) => {
  return {
    display: "flex",
    alignItems: "center",
    marginLeft: 10
  }
})

const StyledAtag = styled.a(({ theme }) => {
  return {
    color: "inherit"
  }
})


// 함수로 작성한 styled component를 선언하세요.
const NavigationRow = styled(Row)(({ theme }) => {
  return {};
});

const StyledSubMenu = styled(SubMenu)(({ theme }) => {
  return {
    ["&&"]: {
      // height: "100%",
    },
  };
});

const StyledMenuItem = styled(Menu.Item)(({ theme }) => {
  return {
    ["&&"]: {
      height: "100%",
    },
  };
});
