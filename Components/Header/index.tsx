// import dependency modules : package.json에 명시된 외부모듈을 선언하세요.
import { Row, Col, Layout, Input, Button } from "antd";
import styled from "styled-components";
import Image from "next/image";
import { useState } from "react"
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import Link from 'next/link'
import { nest } from "@src/configs";
import { useResponse } from "@src/Components/Common/Provider/isMobile";
import Navigation from "../Navigation";
import Logo from "/assets/logo/logo.png"
import Hamburger from "./Hamburger";
import { Provider } from "./Provider";

const { Header: MainHeader } = Layout;

function Header() {
  const router = useRouter();
  const isMobile = useResponse();
  const [searchVisible, setSearchVisible] = useState(false)
  const [searchText, setSearchText] = useState(null)

  // const onClickForm = (e) => {
  //   e.preventDefault();
  //   router.push("/forms");
  // };

  const onClickLogo = (e) => {
    e.preventDefault();
    router.push("/");
  };

  const onSearchText = (e) => {
    setSearchText(e.target.value)
  }


  const onClickSearch = (e) => {
    e.preventDefault();
    if (!searchVisible) {
      setSearchVisible(true)
      return
    }

    if (searchVisible && searchText) {
      router.push(`/search/${searchText}`);
    }

  }


  const onClickCloseSearch = (e) => {
    e.preventDefault();
    if (searchVisible) {
      setSearchVisible(false)
    }
  }

  const handleEnter = (e) => {
    const pressed = e.key.toLowerCase()
    if (pressed === "enter") {
      router.push(`/search/${searchText}`);
    }
  }




  return (
    <Provider>
      <StyledHeader theme="light">
        {!isMobile ? (
          <FullDesktopRow justify={"space-between"}>
            <Col>
              <Row>
                <Col>
                  <AlignCenterWrapper>
                    <Link href={`/`} >
                      <a style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <LogoImage
                          src={Logo}
                          alt="logo"
                          width={200}
                          height={40}
                          onClick={onClickLogo}
                        />
                      </a>
                    </Link>
                  </AlignCenterWrapper>
                </Col>
                <Col>
                  <Navigation></Navigation>
                </Col>
              </Row>
            </Col>


            <AlignCenterCol>
              <Row gutter={[5, 0]}>
                {searchVisible ? <AlignCenterCol>
                  <SearchInput placeholder="Do search" onChange={onSearchText} onKeyDown={handleEnter}></SearchInput>
                </AlignCenterCol>
                  : null}
                <AlignCenterCol>
                  <RoundWrapper onClick={onClickSearch}>
                    <SearchOutlined />
                  </RoundWrapper>
                </AlignCenterCol>
                {searchVisible ? <AlignCenterCol >
                  <RoundWrapper onClick={onClickCloseSearch}>
                    <CloseOutlined />
                  </RoundWrapper>
                </AlignCenterCol> : null}
                <Col>
                  <Link href={`/forms`} >
                    <a>
                      <ListButton>LIST YOUR NFT</ListButton>
                    </a>
                  </Link>
                </Col>
              </Row>
            </AlignCenterCol>
          </FullDesktopRow>
        ) : (<FullRow justify={"space-between"}>
          <MobileCol span={24}>
            {!searchVisible ?
              <AlignCenterWrapper>
                <LogoImage
                  src={Logo}
                  alt="logo"
                  width={200}
                  height={40}
                  onClick={onClickLogo}
                />
              </AlignCenterWrapper>
              : <MobileSearchInputWrapper>
                <SearchInput onChange={onSearchText} placeholder="Do search"></SearchInput>
              </MobileSearchInputWrapper>
            }
            <RightPartRow>
              <AlignCenterCol >
                <RoundWrapper onClick={onClickSearch}>
                  <SearchOutlined />
                </RoundWrapper>
              </AlignCenterCol>
              {searchVisible ? <AlignCenterCol >
                <RoundWrapper onClick={onClickCloseSearch}>
                  <CloseOutlined />
                </RoundWrapper>
              </AlignCenterCol> : null}

              <AlignCenterCol>
                <HamburgerWapper>
                  <Hamburger></Hamburger>
                </HamburgerWapper>
              </AlignCenterCol>
            </RightPartRow>
          </MobileCol>

        </FullRow>
          )}
      </StyledHeader>
    </Provider >
  );
}
const HamburgerWapper = styled.div(({ theme }) => {
  return {
    paddingLeft: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
})

const MobileSearchInputWrapper = styled.div(({ theme }) => {
  return {
    display: "flex",
    alignItems: "center",
    height: "100%",
    width: "calc(100% - 145px)"
  }
})



const MobileCol = styled(Col)(({ theme }) => {
  return {
    display: "flex",
    justifyContent: "space-between"
  }
})

// 함수로 작성한 styled component를 선언하세요.
const AlignCenterWrapper = styled.div(({ theme }) => {
  return {
    display: "flex",
    alignItems: "center",
    height: "100%",
  }
})


const LeftPartCol = styled(Col)(({ theme }) => {
  return {
    width: "calc(100% - 85px)",
  };
});

const RightPartRow = styled(Row)(({ theme }) => {
  return {
    // justifyContent: "flex-end",
  }
})

const FullRow = styled(Row)(({ theme }) => {
  return {
    width: "100%"

  }
})

const FullDesktopRow = styled(Row)(({ theme }) => {
  return {
    width: "100%",
    maxWidth: 1250,
    margin: "0 auto"
  }
})



const SearchInput = styled(Input)(({ theme }) => {
  return {
    borderRadius: 15,
    width: 200,
    border: "none",
    height: 40,
    [`@media (max-width: 992px)`]: {
      width: "100%"
    }
  }
})



const AlignCenterCol = styled(Col)(({ theme }) => {
  return {
    display: "flex",
    alignItems: "center",
  };
});



const LogoImage = styled(Image)(({ theme }) => {
  return {
    cursor: "pointer",
  };
});

const ListButton = styled(Button)(({ theme }) => {
  return {
    ["&&"]: {
      borderRadius: 10,
      background: "#3e5d8b",
      height: 40,
      width: 150,
      color: "white",
    },
    ".ant-btn:hover": {
      borderColor: "#3e5d8b",
    },
  };
});

const RoundWrapper = styled.div(({ theme }) => {
  return {
    ["&&"]: {
      border: "1px solid #3e5d8b",
      borderRadius: 38,
      display: "flex",
      color: "#3e5d8b",
      marginRight: 5,
      marginLeft: 5,
      cursor: "pointer",
      width: 38,
      fontSize: 20,
      alignItems: "center",
      justifyContent: "center",
      height: 38,
      [`@media (max-width: 992px)`]: {
        marginRight: 10,
        fontSize: 15,
        width: 38,
        height: 38
      }
    },
  };
});


const StyledHeader = styled(MainHeader)(({ theme }) => {
  return {
    ["&&"]: {
      width: "100%",
      display: "flex",
      zIndex: 99999,
      height: 69,
      padding: 0,
      position: "fixed",
      background: "#e8eef6",
      [`@media (max-width: 992px)`]: {
        padding: "0px 6%",
      }
    },
  };
});

export default nest(Provider, Header);
