// import dependency modules : package.json에 명시된 외부모듈을 선언하세요.
import { Row, Col, Card, Typography, Divider, Tag, message } from "antd";
import styled from "styled-components";
import { useRouter } from 'next/router';
import Footer from "@src/Components/Footer";
import Image from "next/image";
import Share from "/assets/common/icons/send.png"
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useDetailData, useMoreNewsDetail } from "../Provider";
import { service } from '@src/configs'
import { urlify } from "@src/Components/Common/utils"
const { Title, Text, Paragraph } = Typography;

export default function Desktop() {
  const router = useRouter()
  const detailData = useDetailData()
  const moreNewsDetail = useMoreNewsDetail()
  message.config({
    top: 100,
    duration: 2,
    maxCount: 3,
  });
  const content = urlify(service.getValue(detailData, "content", ""))

  const onCopy = () => {
    message.success({ content: "url copied" })
  }

  const onClickNavigate = (id) => {
    router.push(`/news/${id}`)
  }


  return (
    <>
      <EventRow>
        <Col span={24}>
          <StyledCard
            bodyStyle={{
              padding: 0,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <TopHeaderRow>
              <TopHeaderCol span={24}>
                <DayText>{detailData.createdTime}</DayText>
                <CopyToClipboard text={`https://nftprops${router.asPath}`}
                  onCopy={() => onCopy()}
                >
                  <ShareIconWrapper >
                    <Image
                      src={Share}
                      width={18}
                      height={18}
                    ></Image>
                  </ShareIconWrapper>
                </CopyToClipboard>
              </TopHeaderCol>
            </TopHeaderRow>
            <Divider></Divider>
            <MainTitle>{detailData.title}</MainTitle>
            <ImageWrapper>
              <StyledImage
                src={detailData.coverImage}
              ></StyledImage>
            </ImageWrapper>

            <StyledParagraph>
              {content}
            </StyledParagraph>
            <StylednftTagRow gutter={[15, 0]}>
              <Col>
                <Title level={5}>Tags: </Title>
              </Col>
              <Col>
                {detailData.tags.map((tag) => {
                  return <StyledTag color={"#3e5d8b"}>#{tag}</StyledTag>
                })}
              </Col>
            </StylednftTagRow>
          </StyledCard>
          <SubTitle level={3}>See also</SubTitle>
          <SeeMoreCard
            bodyStyle={{
              padding: 0,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Row style={{ width: "100%" }}>
              {moreNewsDetail.map((news) => {
                return <Col span={24} onClick={() => onClickNavigate(news.id)}>
                  <SeeMoreParagraph >
                    {news.title}
                  </SeeMoreParagraph>
                </Col>
              })}
            </Row>
            <SeeMoreDivider></SeeMoreDivider>
          </SeeMoreCard>
        </Col>
      </EventRow>
      <Footer></Footer>
    </>
  );
}

const ImageWrapper = styled.div(({ theme }) => {
  return {
    width: 620,
    height: 620,
    display: "flex",
    justifyContents: "center",
    alignItems: "center"
  }
})

const StyledImage = styled.img(({ theme }) => {
  return {
    width: 620,
    height: 620
  }
})




const SeeMoreDivider = styled(Divider)(({ theme }) => {
  return {
    marginTop: 10,
    marginBottom: 10,
  };
});

const SeeMoreCard = styled(Card)(({ theme }) => {
  return {
    padding: 30,
  };
});

const SeeMoreParagraph = styled(Paragraph)(({ theme }) => {
  return {
    color: "#555555",
    cursor: "pointer",
    textAlign: "left"
  };
});

const StylednftTagRow = styled(Row)(({ theme }) => {
  return {
    marginTop: 30,
    width: "100%"
  };
});

const SubTitle = styled(Title)(({ theme }) => {
  return {
    ["&&"]: {
      marginTop: 56,
      marginBottom: 17,
      color: "#555555",
    },
  };
});

const StyledTag = styled(Tag)(({ theme }) => { });

const StyledParagraph = styled(Paragraph)(({ theme }) => {
  return {
    marginTop: 50,
    width: "70%",
    whiteSpace: "pre-wrap",
  };
});

const TopHeaderRow = styled(Row)(({ theme }) => {
  return {
    width: "100%"
  };
});

const TopHeaderCol = styled(Col)(({ theme }) => {
  return {
    justifyContent: "space-between",
    display: "flex",
    alignItems: "center"
  };
});

const ShareIconWrapper = styled.div(({ theme }) => {
  return {
    borderRadius: 15,
    width: 32,
    height: 32,
    display: "flex",
    cursor: "pointer",
    justifyContent: "center",
    alignItems: "center",
    background: theme.buttonColor,
  };
});

const DayText = styled(Text)(({ theme }) => {
  return {
    color: "rgba(0, 0, 0, 0.15)",
  };
});

const EventRow = styled(Row)(({ theme }) => {
  return {
    maxWidth: 1250,
    paddingTop: 30,
    paddingBottom: 114,
    margin: "0 auto",
  };
});

const StyledCard = styled(Card)(({ theme }) => {
  return {
    "&&": {
      width: "100%",
      padding: 50,
    },
  };
});

const MainTitle = styled(Title)(({ theme }) => {
  return {
    ["&&"]: {
      marginBottom: 30,
    },
  };
});
