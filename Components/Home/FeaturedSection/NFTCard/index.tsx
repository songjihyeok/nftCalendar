import { Row, Col, Typography, Button } from "antd";
import styled from "styled-components";
import Image from "next/image";
import Link from 'next/link'
import { useResponse } from "@src/Components/Common/Provider/isMobile";
import { useRouter } from "next/router";
import TwitterBlack from "/assets/common/icons/twitterblack.png"
import DiscordBlack from "/assets/common/icons/discordblack.png"
import whiteStar from "/assets/common/icons/whiteStar.png"
import link from "/assets/common/icons/link.png"
import { service, values } from "@src/configs"

import dayjs from "dayjs"
import { urlChange } from "@src/Components/Common/utils/urlChange";



const { Title, Text, Paragraph } = Typography;

export default function NFTCard(props) {

  const { data } = props
  const cardTitle = service.getValue(data, "title", 0)
  // const isPromoted = service.getValue(data, "isPromoted", false)
  const isVerified = service.getValue(data, "isVerified", false)
  const isPromoted = service.getValue(data, "isPromoted", false)
  const startDate = dayjs(service.getValue(data, "startDateTime", dayjs()))
  const endDate = dayjs(service.getValue(data, "endDateTime", dayjs()))
  const createdTime = dayjs(service.getValue(data, "createdDateTime", dayjs()))
  const coverImageId = service.getValue(data, "coverImage", "")
  const category = service.getValue(data, "category", "")
  const coverImageUrl = `${values.imageUrl}/${coverImageId}`
  const titleId = service.getValue(data, "titleId", "")
  const blockChain = values.BlockChainMap[service.getValue(data, "blockchainId", 1)]
  const description = decodeURIComponent(service.getValue(data, "description", ""))
  const router = useRouter();
  const isMobile = useResponse();

  const onClickDetail = () => {

    router.push(`/calendar/${titleId}`);
  }

  return (



    <Link href={`/calendar/${titleId}`}>
      <a>
        <NFTCardWrapper >
          <Row gutter={[15, 0]} style={{ height: "100%" }}>
            <Col
              span={12}
              style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            >

              <ImageWrapper>
                <div>
                  {isPromoted ? <StyledStarWrapper>
                    <Image src={whiteStar} width="15" height="15"></Image>
                  </StyledStarWrapper> : null}

                  <img
                    style={{ height: isMobile ? 160 : 175, width: isMobile ? 160 : 175, borderRadius: 15 }}
                    src={coverImageUrl}>

                  </img>
                </div>

              </ImageWrapper>

            </Col>
            <RightCardCol span={12}>
              <MainTitle ellipsis={{ rows: 2 }}>{cardTitle}</MainTitle>
              <MiddleText ellipsis={{ row: 1 }}>
                {startDate.format("MMM DD, YYYY")} - {endDate.format("MMM DD, YYYY")}
              </MiddleText>
              <CategoryRow>
                <Col span={12}>
                  <MiddleText ellipsis={true}>Category: {category}</MiddleText>
                </Col>
                <Col span={12}>
                  <MiddleText ellipsis={true}>BlockChain: {blockChain}</MiddleText>
                </Col>
              </CategoryRow>
              <StyledParagraph ellipsis={{ rows: 2 }}>
                {description}
              </StyledParagraph>
              <MiddleText>Added {createdTime.format("MMM DD, YYYY")}</MiddleText>
              <BottomCardRow>
                <Col
                  span={13}
                  style={{
                    height: "100%",
                  }}
                >
                  <LinkButtonsRow gutter={[5, 0]}>
                    <Col style={{ height: "100%" }}>
                      <LinkButton>
                        <Image
                          width="12"
                          height="12"
                          src={TwitterBlack}
                        ></Image>
                      </LinkButton>
                    </Col>
                    <Col>
                      <LinkButton>
                        <Image
                          width="12"
                          height="12"
                          src={DiscordBlack}
                        ></Image>
                      </LinkButton>
                    </Col>
                    <Col>
                      <LinkButton>
                        <Image
                          width="12"
                          height="12"
                          src={link}
                        ></Image>
                      </LinkButton>
                    </Col>
                  </LinkButtonsRow>
                </Col>
                <LinkWrappCol offset={1} span={10}>
                  <SourceLink>{isMobile ? "Link" : "Source link"}</SourceLink>
                </LinkWrappCol>
              </BottomCardRow>
            </RightCardCol>
          </Row>
        </NFTCardWrapper>
      </a>
    </Link>

  );
}

// 함수로 작성한 styl 
const ImageWrapper = styled.div(({ theme }) => {
  return {
    position: "static",
    width: "100%",
    display: "flex",
    justifyContent: "center"
  }
})


const StyledStarWrapper = styled.div(({ theme }) => {
  return {
    position: "absolute",
    width: 30,
    height: 37,
    backgroundColor: "#218ce0",
    zIndex: 999,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "15px 0 20px 0"
  }
})



const LinkWrappCol = styled(Col)(({ theme }) => {
  return {
    ["&&"]: {
      display: "flex",
      justifyContent: "flex-end",
    },
  };
});

const BottomCardRow = styled(Row)(({ theme }) => {
  return {
    alignItems: "center",
    marginTop: 5,
  };
});

const StyledParagraph = styled(Paragraph)(({ theme }) => {
  return {
    ["&&"]: {
      height: 28,
      fontSize: 11,
      lineHeight: "1.3em",
      marginTop: 5,
      color: "#777777",
    },
  };
});

const CategoryRow = styled(Row)(({ theme }) => {
  return {
    width: "100%",
  };
});

const MiddleText = styled(Text)(({ theme }) => {
  return {
    ["&&"]: {
      fontSize: 8,
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      textAlign: "left",
      color: "#777777",
    },
  };
});

const RightCardCol = styled(Col)(({ theme }) => {
  return {
    padding: 0,
  };
});

const MainTitle = styled(Title)(({ theme }) => {
  return {
    ["&&"]: {
      fontSize: 21,
      height: 51.6,
      marginBottom: 0,
    },
  };
});

const LinkButton = styled.div(({ theme }) => {
  return {
    border: "solid 1px #ccc",
    width: 16,
    height: 16,
    borderRadius: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
});

const LinkButtonsRow = styled(Row)(({ theme }) => {
  return {
    ["&&"]: {
      display: "flex",
      alignItems: "center",
    },
  };
});

const SourceLink = styled(Button)(({ theme }) => {
  return {
    ["&&"]: {
      border: "solid 1px #218ce0",
      color: "#218ce0",
      fontWeight: 700,
      fontSize: 6,
      padding: 7,
      borderRadius: 20,
    },
  };
});

const NFTCardWrapper = styled.div(({ theme }) => {
  return {
    height: "auto",
    // maxWidth: 461,
    padding: 15,
    cursor: "pointer",
    background: "white",
    borderRadius: 15,
    position: "static"



  };
});

const CardImage = styled(Image)(({ theme }) => {
  return {
    ["&&"]: {
      // width: "100%",
      borderRadius: 15
    },
  };
});
