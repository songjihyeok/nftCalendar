// import dependency modules : package.json에 명시된 외부모듈을 선언하세요.
import { Row, Col, Divider, Typography } from 'antd';
import styled from 'styled-components';
import { StarOutlined } from "@ant-design/icons";
import Image from "next/image"
import { useRouter } from "next/router";
import Twitter from "/assets/common/icons/twitter.png"
import Discord from "/assets/common/icons/discord.png"
import { service, values as commonValues } from "@src/configs"
import { values } from "@src/configs/values"
import Link from 'next/link'
import whiteStar from "/assets/common/icons/whiteStar.png"
import { useDiscord } from "@src/Components/Common/hooks/discord"
import { useTwitter } from "@src/Components/Common/hooks/twitter"
import { urlChange } from '@src/Components/Common/utils/urlChange';

const { Title, Paragraph, Text } = Typography;

interface Iprops {
  data: any
}


export default function MainCard(props: Iprops) {
  const router = useRouter();
  const { data } = props

  const blockChainId = service.getValue(data, "blockchainId", 35)
  const blockChainUrl = commonValues.tagsData.find(element => element.id === blockChainId).image
  const coverImageId = service.getValue(data, "coverImage", "")
  const coverImageUrl = `${values.imageUrl}/${coverImageId}`
  const titleId = service.getValue(data, "titleId", "")
  const isPromoted = service.getValue(data, "isPromoted", false)
  const isVerified = service.getValue(data, "isVerified", false)
  const [discordMembers] = useDiscord(data)
  const [twitterMembers] = useTwitter(data)

  return (

    <CardCol span={24} lg={12}>
      <Link href={`/calendar/${titleId}`}>
        <a>
          <StyledCardWrapper>
            <ImageWrapper>
              {isPromoted ? <StyledStarWrapper>
                <Image src={whiteStar} width="15" height="15"></Image>
              </StyledStarWrapper> : null}
              <img
                style={{ width: "100%", height: 300 }}
                src={coverImageUrl}
              ></img>
            </ImageWrapper>

            <StyledTitle>{service.getValue(data, "title", "unknown")}</StyledTitle>
            <Row>
              <EtherCostCol>
                <EtherIconWrapper>
                  <EtherImage
                    width={20}
                    height={20}
                    src={blockChainUrl}
                  ></EtherImage>
                </EtherIconWrapper>
                <EtherCost>{service.getValue(data, "mintingPrice", 0) + " " + values.unitMap[service.getValue(data, "blockchainId", 35)]} </EtherCost>
              </EtherCostCol>
              <ParagraphCol>
                <EtherParagraph ellipsis={true}>
                  {decodeURIComponent(service.getValue(data, "description", ""))}
                </EtherParagraph>
              </ParagraphCol>
            </Row>
            <Divider style={{ marginBottom: 0, width: "100%" }}></Divider>
            <StyledBottomRow>
              <Col span={8}>
                <BottomTextWrapper>
                  <StarOutlined />
                  <BottomText> {service.amount(service.getValue(data, "numberOfMinting", 0), 0)}</BottomText>
                </BottomTextWrapper>
              </Col>
              <Col span={8}>
                <BottomTextWrapper>
                  <EtherImage
                    width={20}
                    height={20}
                    src={Twitter}
                  ></EtherImage>
                  <BottomText>{twitterMembers === 0 ? 0 : service.amount(twitterMembers * 0.001, 1)} k</BottomText>
                </BottomTextWrapper>
              </Col>
              <Col span={8}>
                <BottomTextWrapper>
                  <EtherImage
                    width={15}
                    height={15}
                    src={Discord}
                  ></EtherImage>
                  <BottomText>{discordMembers === 0 ? 0 : service.amount(discordMembers * 0.001, 1)} k</BottomText>
                </BottomTextWrapper>
              </Col>
            </StyledBottomRow>
          </StyledCardWrapper>
        </a>
      </Link>
    </CardCol >

  );
}

// 함수로 작성한 styled component를 선언하세요.

const StyledBottomRow = styled(Row)(({ theme }) => {
  return {
    display: "flex",
    alignItems: "center",

    height: 50,
    [`@media (max-width: ${theme.mobileMedia})`]: {
      // height: 30,
      paddingTop: 10
    }
  }
})


const BottomText = styled(Text)(({ theme }) => {
  return {
    ["&&"]: {
      color: "#777777",
      marginLeft: 5,
      fontSize: 14,
    },
  };
});

const BottomTextWrapper = styled.div(({ theme }) => {
  return {
    ["&&"]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };
});

const ParagraphCol = styled(Col)(({ theme }) => {
  return {};
});

const EtherParagraph = styled(Paragraph)(({ theme }) => {
  return {
    ["&&"]: {
      color: "#777777",
      textAlign: "center",
      marginTop: 23,
      height: 70,
      lineHeight: 1.57,
      whiteSpace: "pre-line",
      marginBottom: 0,
    },
  };
});

const EtherCostCol = styled(Col)(({ theme }) => {
  return {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  };
});

// 함수로 작성한 styled component를 선언하세요.
const EtherCost = styled(Text)(({ theme }) => {
  return {
    ["&&"]: {
      color: "#555",
      fontSize: 18,
    },
  };
});

const EtherIconWrapper = styled.div(({ theme }) => {
  return {
    width: 20,
    height: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 4,
    borderRadius: 18,
  };
});

const EtherImage = styled(Image)(({ theme }) => {
  return {
    ["&&"]: {},
  };
});

const StyledTitle = styled(Title)(({ theme }) => {
  return {
    ["&&"]: {
      fontSize: 22,
      marginTop: 20,
    },
  };
});

const StyledCardWrapper = styled.div(({ theme }) => {
  return {
    background: "white",
    textAlign: "center",
    height: "100%",
    borderRadius: 15,
    padding: "11px 10px 11px 10px",
    [`@media (max-width: ${theme.mobileMedia})`]: {
      width: "100%",
    },
  };
});


const CardCol = styled(Col)(({ theme }) => {
  return {
    ["&&"]: {
      width: "100%",
      height: 562,
      minWidth: 320,
      cursor: "pointer",
      [`@media (max-width: ${theme.mobileMedia})`]: {
        maxWidth: "100%",
        height: "auto",
        marginBottom: 30,
      },
    },
  };
});

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

const ImageWrapper = styled.div(({ theme }) => {
  return {
    position: "static",
    minHeight: 300
  }
})
