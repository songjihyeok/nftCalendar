// import dependency modules : package.json에 명시된 외부모듈을 선언하세요.
import { useRouter } from "next/router";
import Link from "next/link";
import { Row, Col, Layout, Menu, Avatar, Button } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import Title from "antd/lib/typography/Title";
import { UserOutlined } from "@ant-design/icons";
import styled from 'styled-components';
import Image from "next/image"
// import global modules : 서비스 전역에서 사용중인 모듈을 선언하세요.
import Logo from "/assets/logo/logo.png";

// import local modules : 지역(route)에서 사용중인 모듈을 선언하세요.

export default function AdminLayout({ children }) {
  const router = useRouter();

  const imageProps = {
    src: Logo,
    alt: 'logo',
    width: 200,
    height: 40,
    onClick() {
      router.push("/admin");
    },
  };
  const onLogOut = () => {
    localStorage.removeItem("nftDropsAuthorization")
    router.push("/admin/login");
  }

  return (
    <StyledLayout>
      <StyledHeader>
        <Row align="middle" gutter={[15, 0]}>
          <LogoImageCol>
            <LogoImage {...imageProps} />
          </LogoImageCol>
          <Col>
            <StyledTitle level={3}>Admin page</StyledTitle>
          </Col>
          <Col>
            <StyledMenu
              mode="horizontal"
              defaultSelectedKeys={[router.pathname.replace('/admin/', '')]}
              items={[
                {
                  key: 'drops',
                  label: <Link href="/admin/drops">NFT Drops</Link>,
                },
                {
                  key: 'news',
                  label: <Link href="/admin/news">NFT News</Link>,
                },
                {
                  key: 'email',
                  label: <Link href="/admin/email">Email List</Link>,
                },
              ]}
            />
            {/* <Menu.Item key="drops">
                <Link href="/admin/drops">NFT Drops</Link>
              </Menu.Item>
              <Menu.Item key="news">
                <Link href="/admin/news">NFT News</Link>
              </Menu.Item>
            </StyledMenu> */}
          </Col>
          <SpaceCol />
          <Col>admin</Col>
          <Button onClick={onLogOut} >log out</Button>
        </Row>
      </StyledHeader>
      <StyledContent>
        {children}
      </StyledContent>
    </StyledLayout>
  );
}

// 함수로 작성한 styled component를 선언하세요.
const StyledLayout = styled(Layout)(({ theme }) => ({
  height: '100%',
}));

const StyledHeader = styled(Header)(({ theme }) => ({
  backgroundColor: 'transparent',
  padding: '10px 20px',
}));

const LogoImageCol = styled(Col)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

const LogoImage = styled(Image)(({ theme }) => ({
  cursor: "pointer",

}));

const StyledTitle = styled(Title)(({ theme }) => ({
  ['&&']: {
    marginBottom: 0,
  },
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  ['&&&&']: {
    width: 430,
    backgroundColor: 'transparent',
  },
}));

const StyledContent = styled(Content)(({ theme }) => ({
  overflowY: 'scroll',
  padding: 20,
}));

const SpaceCol = styled(Col)(({ theme }) => ({
  width: 'calc(100% - 950px)',
}));