import { Row, Col, Drawer as AntdDrawer, Menu, Button } from "antd";
import { useState } from "react";
import styled from "styled-components";
import { useHamburgerVisible, useSetHamburgerVisible } from "../../Provider";
import { values } from "./configs"
import { useRouter } from "next/router";
import { service } from "@src/configs";
import Link from "next/link"

export default function Drawer() {
  const Visible = useHamburgerVisible();
  const setVisible = useSetHamburgerVisible();
  const router = useRouter();
  const onClickMenu = (route: string) => {
    setVisible(false)

  }

  const onClickForm = () => {
    setVisible(false)
    router.push("/forms")
  }

  const onOpenLink = (link: string) => {
    window.open(link, '_blank')
  }


  return (
    <StyledAntdDrawer
      width="100vw"
      visible={Visible}
      destroyOnClose={true}
      bodyStyle={{
        overflowX: "hidden",
        padding: 0,

        background: "#dbe7f6",
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        // display: "flex",
        // flexDirection: "column",
        // justifyContent: "space-between",
        height: "auto",
        // minHeight: 550,
      }}
      style={{
        boxShadow: "none",
        top: 64,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        height: "auto",
        display: !Visible ? "none" : "inherit",
        // minHeight: 550,
      }}
      contentWrapperStyle={{
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
      }}
      placement="top"
      mask={false}
      closable={false}
      maskClosable={false}
    >
      <StyledMenu
        mode="inline"
      // selectedKeys={selected ? [selected] : []}
      >
        {values.menus.map((element, index) => {
          const children = service.getValue(element, "children", []);
          if (children.length > 0) {
            return (
              <StyledSubMenu
                key={index}
                title={element.title}
              // style={{ background: "#dbe7f6" }}
              >
                {children.map((child) => {

                  if (child.key === "discord" || child.key === "twitter") {
                    return (

                      <StyledMenuItem key={Math.random()} >
                        <Link href={``} >
                          <StyledAtag href={`child.route`} target='_blank'>
                            {child.title}
                          </StyledAtag>
                        </Link>
                      </StyledMenuItem>

                    );
                  }


                  return (
                    <StyledMenuItem key={child.key} onClick={() => onClickMenu(child.route)}>
                      <Link href={`${child.route}`}>
                        <StyledAtag href={`${child.route}`}>
                          {child.title}
                        </StyledAtag>
                      </Link>
                    </StyledMenuItem>
                  );

                })}
              </StyledSubMenu>
            );
          } else {
            return (
              <StyledMenuItem key={element.key} >
                <Link href={``}>
                  <StyledAtag href={``}>
                    {element.title}
                  </StyledAtag>
                </Link>
              </StyledMenuItem>
            );
          }
        })}

      </StyledMenu>
      <Row>
        <ListCol span={24}>
          <ListButton onClick={onClickForm}>List your event</ListButton>
        </ListCol>
      </Row>
    </StyledAntdDrawer >
  );
}

const StyledAtag = styled.a(({ theme }) => {
  return {
    "&&": {
      color: theme.mainTextColor
    }
  }
})



const ListCol = styled(Col)(({ theme }) => {
  return {
    display: "flex",
    justifyContent: "center",
  };
});

const StyledSubMenu = styled(Menu.SubMenu)(({ theme }) => {
  return {};
});

const StyledMenuItem = styled(Menu.Item)(({ theme }) => {
  return {
    paddingLeft: 0,
    color: "#123b77",
  };
});

const StyledAntdDrawer = styled(AntdDrawer)(({ theme, visible }) => {
  return {

    top: 64,
    borderRadius: 30,
    ".ant-drawer-content-wrapper": {
      // minHeight: 550,
      height: "auto",
      ".ant-drawer-content": {
        // minHeight: 300,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
      },
    }
  };
});

// 함수로 작성한 styled component를 선언하세요.
const DrawerRow = styled(Row)(({ theme }) => {
  return {};
});

const StyledMenu = styled(Menu)(({ theme }) => {
  return {
    background: "#dbe7f6",
    padding: "30px",
    color: "#123b77",
    fontWeight: 700,
    fontSize: 17,
    ".ant-menu.ant-menu-sub": {
      background: "#dbe7f6",
      width: "100%",
    },
  };
});

const ListButton = styled(Button)(({ theme }) => {
  return {
    ["&&"]: {
      width: "60%",
      fontSize: 20,
      borderRadius: 10,
      background: "#3e5d8b",
      height: 60,
      marginBottom: 30,
      color: "white",
      alignSelf: "center",
    },
    ".ant-btn:hover": {
      borderColor: "#3e5d8b",
    },
  };
});
