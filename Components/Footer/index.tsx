// import dependency modules : package.json에 명시된 외부모듈을 선언하세요.
import { Row, Col, Layout, Typography } from "antd";
import styled from "styled-components";
import Image from "next/image";
import { useResponse } from "@src/Components/Common/Provider/isMobile";
import { useRouter } from "next/router";
import Link from "next/link"

const { Paragraph, Text, Title } = Typography;
const Logo = "/assets/logo/logo.png"

export default function Footer() {
  const isMobile = useResponse();
  const router = useRouter();
  const onClickRoute = (route) => {
    router.push("/" + route)
  }


  return (
    <FooterRow>
      <FooterCol span={24}>
        <StyledRow>
          <DescriptionsCol span={24} lg={6}>
            <Image
              height={43}
              width={219}
              src={Logo}
            ></Image>
            <StyledParagraph>
              Tired of missing NFT drops and buying on the secondary market?
              Check our Free NFT Calendar and don&apos;t miss any upcoming NFT drop.
              Made with ❤️ for the Decentralized World, NFT Drops Calendar is an
              independent NFT database and is not affiliated with any NFT
              project or company.
            </StyledParagraph>
            <StyledText>ⓒ 2022 NFTCalendar.oo</StyledText>
          </DescriptionsCol>
          <Col span={24} lg={8} offset={2}>
            <FooterTitlesRow>
              <FooterTitlesCol span={12}>
                <MainFooterTitle level={3}>About</MainFooterTitle>
                <SubFooterTitle level={5}>
                  <Link href={`/about`}>
                    <StyledAtag href={`/about`}>About us
                    </StyledAtag>
                  </Link></SubFooterTitle>
                <SubFooterTitle level={5}>
                  <Link href={`/contact`}>
                    <StyledAtag href={`/contact`}>
                      Contact us
                  </StyledAtag>
                  </Link>
                </SubFooterTitle>

                <SubFooterTitle level={5} >
                  <Link href={`/forms`}>
                    <StyledAtag href={`/forms`}>
                      Submit your nft
                    </StyledAtag>
                  </Link>
                </SubFooterTitle>
              </FooterTitlesCol>
              <FooterTitlesCol span={12}>
                <MainFooterTitle level={3}>NFT Drops</MainFooterTitle>



                <Link href={`/featured`}>
                  <StyledAtag href={`/featured`}>
                    Featured nft
                  </StyledAtag>
                </Link>



                <SubFooterTitle level={5}>
                  <Link href={`/todays`}>
                    <StyledAtag href={`/todays`}>
                      Today&apos;s nft
                    </StyledAtag>
                  </Link>

                </SubFooterTitle>
                <SubFooterTitle level={5} >
                  <Link href={`/ongoing`}>
                    <StyledAtag href={`/ongoing`}>
                      Ongoing nft
                    </StyledAtag>
                  </Link>
                </SubFooterTitle>
                <SubFooterTitle level={5} >
                  <Link href={`/upcoming`}>
                    <StyledAtag href={`/upcoming`}>
                      Upcoming nft
                    </StyledAtag>
                  </Link>

                </SubFooterTitle>
              </FooterTitlesCol>
            </FooterTitlesRow>
          </Col>
        </StyledRow>
      </FooterCol>
    </FooterRow>
  );
}


const StyledAtag = styled.a(({ theme }) => {
  return {
    color: theme.buttonColor
  }
})

const FooterTitlesRow = styled(Row)(({ theme }) => {
  return {
    paddingBottom: 82,
  };
});

const DescriptionsCol = styled(Col)(({ theme }) => {
  return {};
});

const StyledRow = styled(Row)(({ theme }) => {
  return {
    [`@media (max-width: ${theme.mobileMedia})`]: {
      flexDirection: "column-reverse",
    },
  };
});

const FooterTitlesCol = styled(Col)(({ theme }) => {
  return {
    // [`@media (max-width: ${theme.mobileMedia})`]: {
    //   marginRight: 50,
    // },
  };
});

const MainFooterTitle = styled(Title)(({ theme }) => {
  return {
    ["&&"]: {
      color: "#123b77",
      marginBottom: 30,
    },
  };
});

const SubFooterTitle = styled(Text)(({ theme }) => {
  return {
    ["&&"]: {
      color: "#3e5d8b",
      display: "block",
      marginTop: 15,
      cursor: "pointer"
    },
  };
});

const StyledText = styled(Text)(({ theme }) => {
  return {
    color: "#7d92b1",
  };
});

const StyledParagraph = styled(Paragraph)(({ theme }) => {
  return {
    ["&&"]: {
      color: "#7d92b1",
      marginTop: 52,
      marginBottom: 52,
    },
  };
});

const FooterCol = styled(Col)(({ theme }) => {
  return {
    maxWidth: 1250,
    paddingTop: 82,
    paddingBottom: 77,
    margin: "0 auto",
  };
});

const FooterRow = styled(Row)(({ theme }) => {
  return {
    background: "#d4e4fa",
  };
});
