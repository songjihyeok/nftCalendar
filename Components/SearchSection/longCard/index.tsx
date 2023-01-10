// import dependency modules : package.json에 명시된 외부모듈을 선언하세요.
import { Card, Row, Col, Typography, Button, } from "antd";
import { useEffect, useState } from "react"
import styled from "styled-components";
import Image from "next/image";
import dayjs from "dayjs"
import axios from "axios"
import Link from 'next/link'
import { useResponse } from "@src/Components/Common/Provider/isMobile";
import { useRouter } from "next/router";
import Ethereum from "/assets/common/coin/Ethereum.png"
import Solana from "/assets/common/coin/Solana.png"
import nftIcon from "/assets/common/icons/nfticon.png"
import Discord from "/assets/common/icons/discord.png"
import Twitter from "/assets/common/icons/twitter.png"
import LikeIcon from "/assets/common/icons/likeIcon.png"
import whiteStar from "/assets/common/icons/whiteStar.png"
import { service, values } from "@src/configs"
import { urlChange } from "@src/Components/Common/utils/urlChange";
import { useDiscord } from "@src/Components/Common/hooks/discord"
import { useTwitter } from "@src/Components/Common/hooks/twitter"
const { Title, Paragraph, Text } = Typography;

export default function LongCard(props) {

  const { data } = props

  const [discordMembers] = useDiscord(data)
  const [twitterMembers] = useTwitter(data)
  const cardTitle = service.getValue(data, "title", 0)
  const isVerified = service.getValue(data, "isVerified", false)
  const isPromoted = service.getValue(data, "isPromoted", false)
  const startDate = dayjs(service.getValue(data, "startDateTime", dayjs()))
  const coverImageId = service.getValue(data, "coverImage", "")
  const description = decodeURIComponent(service.getValue(data, "description", ""))
  const blockCainType = service.getValue(data, "blockchainId", 2)
  const mintingPrice = service.getValue(data, "mintingPrice", 0)
  const coverImageUrl = `${values.imageUrl}/${coverImageId}`
  const titleId = service.getValue(data, "titleId", "")
  const isMobile = useResponse();
  const router = useRouter();
  const onClickDetail = () => {
    router.push(`/calendar/${titleId}`);
  }
  const BlockChain = values.tagsData.find((element) => element.id === blockCainType)
  const BlockChainImage = service.getValue(BlockChain, "image", Ethereum)
  const BlockChainName = service.getValue(BlockChain, "title", "Ethereum")

  const onUpvote = (event) => {
    event.stopPropagation();
  }

  return (
    <Link href={`/calendar/${titleId}`}>
      <a>
        <StyledCard bodyStyle={{ height: "100%" }} onClick={onClickDetail}>
          <StyledCardRow>
            <Col span={24} lg={7} style={{ display: "flex", justifyContent: "center" }}>

              <CardImageWrapper>
                {isPromoted ? <StyledStarWrapper>
                  <Image src={whiteStar} width="15" height="15"></Image>
                </StyledStarWrapper> : null}
                <StyledMainImage
                  src={coverImageUrl}
                ></StyledMainImage>
              </CardImageWrapper>
            </Col>
            <Col offset={isMobile ? 0 : 1} span={24} lg={16}>
              <TextsWrapperRow>
                <TextsWrapperCol span={24} lg={21}>
                  <Title level={5}>{cardTitle}</Title>
                  <StyledParagraph ellipsis={{ rows: 4 }}>
                    {description}
                  </StyledParagraph>
                  <Row gutter={[10, 15]}>
                    <SubTitleCol span={6}>
                      <SubTitle>Blockchain</SubTitle>
                      <CenterLayout>
                        <Image
                          width={20}
                          height={20}
                          src={BlockChainImage}
                        ></Image>
                        <SubTItleText>{BlockChainName}</SubTItleText>
                      </CenterLayout>
                    </SubTitleCol>
                    <SubTitleCol span={6}>
                      <SubTitle>Mint Price</SubTitle>
                      <CenterLayout>
                        <Image
                          width={20}
                          height={20}
                          src={nftIcon}
                        ></Image>
                        <SubTItleText>{service.amount(mintingPrice, 0)}</SubTItleText>
                      </CenterLayout>
                    </SubTitleCol>
                    <SubTitleCol span={6}>
                      <SubTitle>Discord</SubTitle>
                      <CenterLayout>
                        <Image
                          height={17}
                          width={17}
                          src={Discord}
                        ></Image>
                        <SubTItleText>{discordMembers === 0 ? 0 : service.amount(discordMembers * 0.001, 1)} K</SubTItleText>
                      </CenterLayout>
                    </SubTitleCol>
                    <SubTitleCol span={6}>
                      <SubTitle>Twitter</SubTitle>
                      <CenterLayout>
                        <Image
                          width={20}
                          height={20}
                          src={Twitter}
                        ></Image>
                        <SubTItleText>{twitterMembers === 0 ? 0 : service.amount(twitterMembers * 0.001, 1)} K</SubTItleText>
                      </CenterLayout>
                    </SubTitleCol>
                  </Row>
                </TextsWrapperCol>
                {isMobile ? (
                  <RightCol offset={0} span={24} lg={2}>
                    <RightButtonsRow gutter={[15, 0]}>
                      <Col span={12}>
                        <DayInform>
                          <DayInformTitle>{startDate.format("MMM")}</DayInformTitle>
                          <DayInformTitle>{startDate.format("DD")}</DayInformTitle>
                        </DayInform>
                      </Col>
                      <Col span={12}>
                        <UpvoteWrapper onClick={onUpvote}>
                          <Image
                            width={23}
                            height={20}
                            src={LikeIcon}
                          ></Image>
                      Upvote
                    </UpvoteWrapper>
                      </Col>
                    </RightButtonsRow>
                  </RightCol>
                ) : (
                    <RightCol offset={1} span={24} lg={2}>
                      <DayInform>
                        <DayInformTitle>{startDate.format("MMM")}</DayInformTitle>
                        <DayInformTitle>{startDate.format("DD")}</DayInformTitle>
                      </DayInform>
                      <UpvoteWrapper onClick={onUpvote}>
                        <Image
                          width={23}
                          height={20}
                          src={LikeIcon}
                        ></Image>
                  upvote
                </UpvoteWrapper>
                    </RightCol>
                  )}
              </TextsWrapperRow>
            </Col>
          </StyledCardRow>
        </StyledCard>
      </a>
    </Link>
  );
}

const CenterLayout = styled.div(({ theme }) => {
  return {
    display: "flex",
    alignItems: "center"
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
    borderRadius: "0 0 15px 0"
  }
})


const SubTItleText = styled(Text)(({ theme }) => {
  return {
    "&&": {
      fontSize: 12,
      overflowX: "hidden",
      marginLeft: 5,
      [`@media (max-width: ${theme.mobileMedia})`]: {
        fontSize: 12,
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      },
    }
  }
})

const StyledMainImage = styled.img(({ theme }) => {
  return {

    height: 250,
    width: 250,
    [`@media (max-width: ${theme.mobileMedia})`]: {
      height: 350,
      width: 350,
      display: "flex",
      justifyContent: "center"
    },
  }
})



const StyledCardRow = styled(Row)(({ theme }) => {
  return {
    height: "100%",
    [`@media (max-width: ${theme.mobileMedia})`]: {
      height: "auto",
    },
  };
});

const RightButtonsRow = styled(Row)(({ theme }) => {
  return {
    width: "100%",
  };
});

const CardImageWrapper = styled.span(({ theme }) => {
  return {
    [`@media (max-width: ${theme.mobileMedia})`]: {
      minHeight: 250,
    },
  };
});

const ImageCol = styled(Col)(({ theme }) => {
  return {
    justifyContent: "center",
    display: "flex",
  };
});

const TextCol = styled(Col)(({ theme }) => {
  return {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap"
  };
});

const SubTitleCol = styled(Col)(({ theme }) => {
  return {
    ["&&"]: {
      // paddingRight: 10
    },
  };
});

const CardRow = styled(Row)(({ theme }) => {
  return {
    height: "100%",
  };
});

const TextsWrapperCol = styled(Col)(({ theme }) => {
  return {
    paddingRight: 15,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    [`@media (max-width: ${theme.mobileMedia})`]: {
      height: "auto",
      paddingRight: 0,
      paddingBottom: 15,
    },
  };
});

const CardImageCol = styled(Col)(({ theme }) => {
  return {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: 240,
  };
});

const DayInformTitle = styled(Title)(({ theme }) => {
  return {
    ["&&&&&"]: {
      fontSize: 18,
      textAlign: "center",
      marginBottom: 0,
      marginTop: 3,
      color: "white",
    },
  };
});

const RightCol = styled(Col)(({ theme }) => {
  return {
    height: "100%",
    margin: "15px 0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    [`@media (max-width: ${theme.mobileMedia})`]: {
      flexDirection: "row",
      height: "auto",
    },
  };
});

const SubTitle = styled(Title)(({ theme }) => {
  return {
    ["&&"]: {
      color: "#123b77",
      fontSize: 12.5,
      marginBottom: 3,
    },
  };
});

const StyledParagraph = styled(Paragraph)(({ theme }) => {
  return {
    color: theme.greyTheme,
    maxHeight: 88,
  };
});

const TextsWrapperRow = styled(Row)(({ theme }) => {
  return {
    height: "100%",
    [`@media (max-width: ${theme.mobileMedia})`]: {
      paddingTop: 15,
    },
  };
});

const TextsCol = styled(Col)(({ theme }) => {
  return {
    padding: "22.8px 22.8px 22.8px 10px",
  };
});

const StyledCard = styled(Card)(({ theme }) => {
  return {
    ["&&"]: {
      padding: 15,
      borderRadius: 8,
      height: 280,
      marginBottom: 15,
      cursor: "pointer",
      [".ant-card-body"]: {
        padding: 0,
      },
      [`@media (max-width: ${theme.mobileMedia})`]: {
        height: "auto",
      },
    },
  };
});

const LongCardImage = styled(Image)(({ theme }) => {
  return {
    ["&&"]: {},
  };
});

const DayInform = styled.div(({ theme }) => {
  return {
    ["&&"]: {
      height: 65,
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
      background: theme.subColor,
      borderRadius: 5,
    },
  };
});

const UpvoteWrapper = styled(Button)(({ theme }) => {
  return {
    width: "100%",
    height: 65,
    background: "white",
    border: `1px solid #dddddd`,
    fontSize: 10,
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [`@media (max-width: ${theme.mobileMedia})`]: {
      height: "100%",
    },
  };
});
