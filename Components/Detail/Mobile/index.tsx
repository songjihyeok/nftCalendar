// import dependency modules : package.json에 명시된 외부모듈을 선언하세요.
import {
  Row,
  Col,
  Card,
  Typography,
  Tag,
  Form,
  Button,
  Input,
  Descriptions,
  Carousel,
  message
} from "antd";
import Link from 'next/link'
import styled from "styled-components";
import Image from "next/image";
import Footer from "@src/Components/Footer";
import { values, service } from "@src/configs"
import { useRouter } from "next/router";
import Web from '/assets/common/icons/web.png'
import Twitter from "/assets/common/icons/twitterDetail.png"
import Discord from "/assets/common/icons/discordDetail.png"
import link from "/assets/common/icons/link.png"
import { useMutation } from '@apollo/client';
import { useData, useTagListData } from "../Provider"
import SubscriptionCreateQuery from "@src/graphql/mutation/createSubscription"
import Inactive from '/assets/home/arrow/arrow_button_left_inactived.svg'
import active from '/assets/home/arrow/arrow_button_right_actived.svg'
import whiteStar from "/assets/common/icons/whiteStar.png"
import { urlChange } from "@src/Components/Common/utils/urlChange";
import HeadInfo from "@src/Components/HeadInfo"
import { urlify } from "@src/Components/Common/utils"


const { Title, Text, Paragraph } = Typography;

export default function Mobile() {
  const [createSubscription] = useMutation(SubscriptionCreateQuery);
  message.config({
    top: 100,
    duration: 2,
    maxCount: 3,
  });

  const onFinish = async (value) => {

    const email = service.getValue(value, "email", "")
    const result = await createSubscription({ variables: { input: { email: email } } })
    if (result) {
      message.success({ content: "Email has been registered" })
    }

  };
  const router = useRouter();
  const data = useData()
  const tagListData = useTagListData()
  const isVerified = data.isVerified
  const isPromoted = data.isPromoted
  const decodedDescription = decodeURIComponent(data.description)
  const description = urlify(decodedDescription)


  const onClickTag = (tag) => {
    router.push(`/tag/${tag}`);
  }

  return (
    <>
      <DetailRow>
        <HeadInfo title={`${data.title} - NFT Drops`} contents={decodedDescription.toString()}></HeadInfo>
        <DetailCol span={24}>
          <StyledCard
            bodyStyle={{
              padding: 0,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              paddingTop: 30
            }}
          >
            <ImageWrapper>
              {isPromoted ? <StyledStarWrapper>
                <Image src={whiteStar} width="20" height="20"></Image>
              </StyledStarWrapper> : null}
              <StyledImg
                src={data.coverImage}
              ></StyledImg>
            </ImageWrapper>

            <DetailsRow gutter={[0, 0]}>
              <MainTitle>
                {data.title}
              </MainTitle>
              <Col span={24}>
                <DateTitle>{data.startDate.format("MMMM DD, YYYY") + " - " + data.endDate.format("MMMM DD, YYYY")}</DateTitle>
              </Col>
              <Col span={24}>
                <Row gutter={[30, 0]}>
                  <Col>
                    <DetailTitle>BLOCKCHAIN</DetailTitle>
                    <DetailTag>{data?.blockChain}</DetailTag>
                  </Col>
                  <Col>
                    <DetailTitle>MARKET PLACE</DetailTitle>
                    <DetailTag>{data?.marketName}</DetailTag>
                  </Col>
                </Row>
                <ProjectLinksRow>
                  <Col>
                    <DetailTitle>PROJECT LINKS:</DetailTitle>
                    <DetailTagTopRow gutter={[10, 10]}>
                      <Col>
                        <Link href={data?.announcementUrl}>
                          <a target="_blank" rel="noopener noreferrer" className='link-item'>
                            <DetailTag>
                              <TagImage
                                width={15}
                                height={15}
                                style={{ marginRight: 5 }}
                                src={Web}
                              ></TagImage>

                              <TagText> Website</TagText>
                            </DetailTag>
                          </a>
                        </Link>
                      </Col>
                      <Col>
                        <Link href={data.twitterUrl}>
                          <a target="_blank" rel="noopener noreferrer" className='link-item'>
                            <DetailTag>
                              <TagImage
                                width={15}
                                height={15}
                                src={Twitter}
                              ></TagImage>
                              <TagText>Twitter</TagText>
                            </DetailTag>
                          </a>
                        </Link>
                      </Col>
                      <Col>
                        <Link href={data.discordUrl}>
                          <a target="_blank" rel="noopener noreferrer" className='link-item'>
                            <DetailTag>
                              <TagImage
                                width={15}
                                height={15}
                                src={Discord}
                              ></TagImage>
                              <TagText>Discord</TagText>
                            </DetailTag>
                          </a>
                        </Link>
                      </Col>
                      <Col>
                        <Link href={data.marketplaceUrl}>
                          <a target="_blank" rel="noopener noreferrer" className='link-item'>
                            <DetailTag>
                              {" "}
                              <TagImage
                                width={15}
                                height={15}
                                src={link}
                              ></TagImage>
                              <TagText>Market place URL</TagText>
                            </DetailTag>
                          </a>
                        </Link>
                      </Col>
                    </DetailTagTopRow>
                  </Col>
                </ProjectLinksRow>
                <DescriptionRow>
                  <Col span={24}>
                    <DetailTitle>Project details</DetailTitle>
                  </Col>
                  <Col>
                    <StyledDescriptions>
                      <Descriptions.Item
                        label={<DescriptionLabel>Price</DescriptionLabel>}
                      >
                        <DescriptionDetail>{`${data?.mintingPrice} ${data?.unit}`}</DescriptionDetail>
                      </Descriptions.Item>
                      <Descriptions.Item
                        label={
                          <DescriptionLabel>Collection Count</DescriptionLabel>
                        }
                      >
                        <DescriptionDetail>{data?.numberOfMinting} items</DescriptionDetail>
                      </Descriptions.Item>
                      {/* <Descriptions.Item
                        label={
                          <DescriptionLabel>Trait Counts</DescriptionLabel>
                        }
                      >
                        <DescriptionDetail> 205 </DescriptionDetail>
                      </Descriptions.Item> */}
                      <Descriptions.Item
                        label={<DescriptionLabel>Category</DescriptionLabel>}
                      >
                        <DescriptionDetail> {data?.category} </DescriptionDetail>
                      </Descriptions.Item>
                      {/* <Descriptions.Item
                        label={<DescriptionLabel>chain</DescriptionLabel>}
                      >
                        <DescriptionDetail> Ethereum </DescriptionDetail>
                      </Descriptions.Item> */}
                    </StyledDescriptions>
                  </Col>
                </DescriptionRow>
                <DescriptionRow>
                  <Col>
                    <DetailTitle>Description</DetailTitle>
                    <StyledParagraph>
                      {description}
                    </StyledParagraph>
                  </Col>
                </DescriptionRow>
                <StylednftTagRow>
                  <Col span={5}>
                    <Title level={5}>Tags: </Title>
                  </Col>
                  <Col span={19}>
                    <Row gutter={[10, 10]}>
                      {data.tags.map((tag, index) => {
                        return (
                          <Link href={`/tag/${tag}`}>
                            <a>
                              <Col key={index} onClick={() => onClickTag(tag)} style={{ cursor: "pointer" }}>
                                <StyledTag color={"#3e5d8b"}>#{tag}</StyledTag>
                              </Col>
                            </a>
                          </Link>
                        )
                      })}
                    </Row>
                  </Col>
                </StylednftTagRow>
              </Col>
            </DetailsRow>
          </StyledCard>
          <SubTitle level={3}>{`Don't miss the\nnext NFT Drops`}</SubTitle>
          <StyledEmailCard bodyStyle={{ padding: 10 }}>
            <Row style={{ width: "100%" }}>
              <Col span={24}>
                <StyledForm
                  name="customized_form_controls"
                  layout="inline"
                  onFinish={onFinish}
                >
                  <Form.Item name="email" rules={[{
                    message: "check the format",
                    type: 'email'
                  }]}>
                    <Row style={{ width: "100%" }}>
                      <Col span={24}>
                        <Input
                          style={{ height: 50 }}
                          placeholder={"enterYour@emaii.net"}

                        />
                      </Col>
                    </Row>
                  </Form.Item>

                  <Form.Item>
                    <Row>
                      <Col span={24}>
                        <StyledButton htmlType="submit">Subscribe</StyledButton>
                      </Col>
                    </Row>
                  </Form.Item>
                </StyledForm>
              </Col>
            </Row>
          </StyledEmailCard>
          <SubTitle level={3}>See also</SubTitle>
          <MoreCards >
            <CarouselWrapper>
              <MoreCardsRow gutter={[0, 0]}>
                <Col span={24}>
                  <StyledCarousel draggable swipeToSlide slidesToShow={1.2} touchThreshold={1000} dots={false} infinite={false} arrows={false}>
                    {tagListData.map((tagData, index) => {
                      return (
                        <Link href={`/calendar/${tagData.titleId}`}>
                          <a>
                            <MoreCard>
                              <ImageWrapper>
                                {isPromoted ? <StyledStarWrapper>
                                  <Image src={whiteStar} width="20" height="20"></Image>
                                </StyledStarWrapper> : null}
                                <TagListImage
                                  src={values.imageUrl + "/" + service.getValue(tagData, "coverImage", "")}
                                ></TagListImage>
                              </ImageWrapper>

                              <MoreCardTitle level={5} ellipsis={{ rows: 2 }}>
                                {tagData.title}
                              </MoreCardTitle>
                            </MoreCard>
                          </a>
                        </Link>
                      )
                    })}
                  </StyledCarousel>
                </Col>
              </MoreCardsRow>
            </CarouselWrapper>
          </MoreCards>
        </DetailCol>
      </DetailRow>
      <Footer></Footer>
    </>
  );
}

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

const StyledCarousel = styled(Carousel)(({ theme }) => {
  return {
    // width: "100vw"
  }
})


const TagListImage = styled.img((theme) => {
  return {
    width: 250,
    height: 250
  }
})
const ImageWrapper = styled.div(({ theme }) => {
  return {
    position: "static"
  }
})




const CarouselWrapper = styled.div(({ theme }) => {
  return {
    ['& .ant-carousel']: {
      ['.slick-arrow']: {
        top: 135.5,
        width: 48,
        height: 48,
        background: `url(${active}) no-repeat`,
        backgroundSize: 'contain',
        ['&:focus,&:hover']: {
          backgroundSize: 'contain',
        },
        ['&.slick-disabled']: {
          background: `url(${Inactive}) no-repeat`,
          backgroundSize: 'contain',
        },
        ['&.slick-next']: {
          right: -70,
        },
        ['&.slick-next.slick-disabled']: {
          background: `url(${Inactive}) no-repeat`,
          backgroundSize: 'contain',
          transform: 'rotate(180deg)',
        },
        ['&.slick-prev']: {
          left: -70,
          background: `url(${active})`,
          backgroundSize: 'contain',
          transform: 'rotate(180deg)',
        },
        ["&.slick-prev.slick-disabled"]: {
          background: `url(${Inactive}) no-repeat`,
          backgroundSize: 'contain',
          transform: 'rotate(0deg)',
        },
      }
    },
  }
})

const StyledImg = styled.img(({ theme }) => {
  return {
    width: 350,
    height: 350,
  }
})



const DescriptionLabel = styled(Text)(({ theme }) => {
  return {
    ["&&"]: {
      color: "#555555",
    },
  };
});

const DescriptionDetail = styled(Title)(({ theme }) => {
  return {
    ["&&"]: {
      fontSize: 14,
      marginBottom: 0,
      lineHeight: "inherit",
    },
  };
});

const StyledDescriptions = styled(Descriptions)(({ theme }) => {
  return {
    ["&&&& .ant-descriptions-row > td "]: {
      paddingBottom: 3,
    },
  };
});

const TagText = styled(Text)(({ theme }) => {
  return {
    marginLeft: 5,
  };
});

const DetailTagTopRow = styled(Row)(({ theme }) => {
  return {};
});

const ProjectLinksRow = styled(Row)(({ theme }) => {
  return {
    marginTop: 30,
  };
});

const DescriptionRow = styled(Row)(({ theme }) => {
  return {
    marginTop: 30,
  };
});

const DetailCol = styled(Col)(({ theme }) => {
  return {};
});

const DetailTag = styled.span(({ theme }) => {
  return {
    background: "#e5eefa",
    borderRadius: 8,
    height: 30,
    color: "#123b77",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
  };
});

const MoreCardsRow = styled(Row)(({ theme }) => {
  return {
    flexWrap: "nowrap",
    overflowX: "scroll",
    width: "100%",
    "&&::-webkit-scrollbar": {
      display: "none",
    },
  };
});

const MoreCardTitle = styled(Title)(({ theme }) => {
  return {
    ["&&"]: {
      marginTop: 15,
      height: 48,
      marginBottom: 0,
    },
  };
});

const MoreCard = styled.div(({ theme }) => {
  return {
    width: 250,
    padding: "0 15",

  };
});

const MoreCards = styled(Card)(({ theme }) => {
  return {
    ["&&&&"]: {
      marginBottom: 119,
      display: "flex",
      overflow: "hidden",
      justifyContents: "center",
      [".ant-card-body"]: {
        width: " 100%"
      }
    }
  };
});

const StyledForm = styled(Form)(({ theme }) => {
  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ".ant-form-item": {
      width: "100%",
      marginRight: 0,
    },
  };
});

const StyledButton = styled(Button)(({ theme }) => {
  return {
    background: theme.subColor,
    color: "white",
    height: 50,
    marginTop: 10,
    width: "100%",
    borderRadius: 8,
  };
});

const SubTitle = styled(Title)(({ theme }) => {
  return {
    ["&&"]: {
      marginTop: 56,
      marginBottom: 17,
      textAlign: "center",
      whiteSpace: "pre-line",
      color: "#555555",
    },
  };
});

const StylednftTagRow = styled(Row)(({ theme }) => {
  return {
    marginTop: 30,
  };
});

const StyledTag = styled(Tag)(({ theme }) => {
  return {
    ["&&"]: {
      marginRight: 0,
    },
  };
});

const DetailTitle = styled(Title)(({ theme }) => {
  return {
    ["&&"]: {
      color: "#333333",
      fontSize: 16,
      marginBottom: 12,
    },
  };
});

const StyledParagraph = styled(Paragraph)(({ theme }) => {
  return {
    marginTop: 15,
    whiteSpace: "pre-wrap",
  };
});

const TagTitle = styled(Title)(({ theme }) => {
  return {
    ["&&"]: {
      fontSize: 13,
      marginBottom: 0,
      marginLeft: 5,
    },
  };
});

const TagImage = styled(Image)(({ theme }) => {
  return {
    ["&&"]: {
      marginRight: 5,
    },
  };
});

const TagCol = styled(Col)(({ theme }) => {
  return {};
});

const TagWrapper = styled.div(({ theme }) => {
  return {
    background: "#dddddd",
    height: 30,
    cursor: "pointer",
    padding: "5px 10px",
    borderRadius: 8,
    alignItems: "center",
    display: "flex",
  };
});

const IconImage = styled(Image)(({ theme }) => {
  return {
    marginRight: 5,
  };
});

const LabelText = styled(Text)(({ theme }) => {
  return {
    ["&&"]: {
      color: "#777777",
      marginRight: 5,
    },
  };
});

const DescriptionText = styled(Text)(({ theme }) => {
  return {
    marginLeft: 5,
    color: "#333333",
  };
});

const RightDetailCol = styled(Col)(({ theme }) => {
  return {
    ["&&"]: {
      width: "100%",
      height: "100%",
      minHeight: 55,
    },
  };
});

const DateTitle = styled(Title)(({ theme }) => {
  return {
    ["&&&&"]: {
      fontSize: 14,
      marginTop: 5,
      marginBottom: 35,
      color: "#333333",
    },
  };
});

const RightDetailsWrapper = styled.div(({ theme }) => {
  return {
    background: "#eeeeee",
    padding: 10,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    border: "1px solid #dddddd",
  };
});

const LeftDetailsWrapper = styled.div(({ theme }) => {
  return {
    background: "#eeeeee",
    padding: 15,
    width: "100%",
    height: "100%",
    border: "1px solid #dddddd",
  };
});

const DetailsCol = styled(Col)(({ theme }) => {
  return {};
});

const DetailsRow = styled(Row)(({ theme }) => {
  return {
    width: "100%",
    padding: "0 20px",
    marginTop: 30,
    minHeight: 121,
    paddingBottom: 30,
  };
});

const MainTitle = styled(Title)(({ theme }) => {
  return {
    ["&&"]: {
      marginBottom: 10,
      fontSize: 30,
    },
  };
});

const DetailRow = styled(Row)(({ theme }) => {
  return {
    maxWidth: 1250,
    paddingTop: 30,
    margin: "0 auto",
  };
});

const StyledCard = styled(Card)(({ theme }) => {
  return {
    "&&": {
      width: "100%",
      padding: 0,
      background: "#f1f5fb",
    },
  };
});

const StyledEmailCard = styled(Card)(({ theme }) => {
  return {
    width: "80%",
    margin: "0 auto"
  };
});
