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
import HeadInfo from "@src/Components/HeadInfo"
import styled from "styled-components";
import { useRouter } from "next/router";
import Link from 'next/link'
import Image from "next/image";
import Footer from "@src/Components/Footer";
import Web from '/assets/common/icons/web.png'
import Twitter from "/assets/common/icons/twitterDetail.png"
import Discord from "/assets/common/icons/discordDetail.png"
import link from "/assets/common/icons/link.png"
import Advertise from "@src/Components/Advertise"
import { useMutation } from '@apollo/client';
import whiteStar from "/assets/common/icons/whiteStar.png"
import { urlify } from "@src/Components/Common/utils"
import { values, service } from "@src/configs"
import { useData, useTagListData } from "../Provider"
import SubscriptionCreateQuery from "@src/graphql/mutation/createSubscription"

const Inactive = 'data:image/png;base64,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'
const active = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKQAAACkCAMAAAAua3VzAAAAclBMVEVHcEwSO3cSO3cSO3cSO3cSO3cSO3cSO3cSO3cSO3cSO3cSO3cSO3cSO3cSO3cSO3cSO3cSO3cSO3cSO3cSO3cSO3f///8MNnQBK2wGMXAAJGcAHGElS4Lt8PWFm7k4W42hsspObZpphKr2+Pq8yNnX3ui6Rgj+AAAAFXRSTlMA41GZyLjwCNj4P+qoMBpzZIERJIxCz6rAAAAInElEQVR42tWd13KrMBBAqQIs3CgW2E7cbv7/F++uCsaJnRhJNB4yyUNmzmzXSlo5TvcviqIsW+XLhedt1tvCT9MwDII4jl3XpfyDX+DPIAjDNPWL7XrjeYtlvsoy+FdnmK+BXGyeQJKnkIuBIZEQEEGQbUTgI4QkSVKW8AN+BdJHzCVgcs4hEKWiFSHKEAAB7tsHqNTl8pScSulR/4z5EgHvSkYRJj8R75zuXfEIusz7poxWIMX11gcBcjwqNfz647qnAjVM/e0apLmK+nMXoegNIsYu+RXtKS5xY8TcSKX3QZrlwlW4FGlnRI5JpTQ5Zw9az3Kl50BHjHdhBkrredaDLYKeQYYYaTQRBSa6fBCC1u3aJhojiLFIddX8TO1pgcK0Fo+4R6O7BDEpLX0EKIUL2ZEmMHpS09YYgVLq3LNCiYxrlCIlSWnxgzCP0lxboIy4U/uhJWP8YZqhz93cKGZmXNUQu0nZy0cgunOVZ4axEa2xJ0buQFKYBowgRuvW+EiJlgkxU5Mykoxuf4TCMl1JGWlGnqJ/RkFZaMUiEXmg2umdESm5l3emVIxkAEYsjXUoG8ZyoK87ZTQ4450y6ypHmgwHiYVRF1kOao/tkqODxqNscF0/aPydeAkxfBxGRflGVOd5ZmB7fKiK3sk9yFgMbo8tWRZ/5/FoxfM1LUf6KM/jfzgPOM12iHz98sNqA5znV0GC04zKyKsNcJ7od2X7ozJCHncD/zeFYxTfhvGYjIgZh9tfYjpG8TQg5cgfQYW/Mks0yJGVrczSf2mWKx7FRxekyDxgli8EuR0n0/zsG6BZPhFlJDx7CoyYH4WHR5P07N89HOqzBXgNLSfyoe8svldtqOxiEl7TrjS+iXL0nP2sY/A9WGY8H05GkLiYQN/JHrWNXkOS6UDKMPQAudxMyGtUaelvlvcohDFyncbJtCBJnK5bsVLESLec2Oe2Y6VYe01N2zxW3ldlXJAGJRqr66quGeuhZGtEGUX5AhfaiTZjtd/vK/uUiViGR2LzlQuSmkAe+qBMqAjo4Dui/NHOiIyhtlGUXOWsZHZFKYqhLFvBokG3jmTKGOsKP8FpsaMBCwkBmXtFqJkRQdVVXZ4ul9Ox3gtx2lQ6ccPCy7PMWa0w2xBdQQJYefk8f16A8nDY23XzhGDWWa2cPF/qZxuGPlNez19f5ytSKstk1qwy3Szz3FlCtZvqZhtWHQ6H8vrvtvv4dz2V1V4Ypj1xYmpcLp3FwiAlKsjdDihB5dJ/7CkdU+Ni4XhQkmunRA7JUJK73e0LMVnFHciWm1Mo0D3P2XgGaxu0yUN94ZCIeQadc/+pamGbpqAU+wQAadKP5JDV5SwgQedfKEwVMy2Ik/crN856XaTaCzCGcac6NZDcNEGa0jRR6+YLsvXa2W4Neis/IVGaZzRNaZuGosSOy3brFCY7sc8gdzd09BLCvIztJpx8B7dwfN+0AvoOCR96EBNeXhuFTayEfN9JU4Mu1StIdHSImkzUmgZax0VjmnJIg6Ic8+ITSG6a19ORgTkYFZuw/g5DJwwNGhcC8vj58RNyd7vJhH5QwV0HNFGQ1Ayyeg4pU2UTjvSSJeg7CJwgMOhccJt7DQkepDL6XmXL7kFIQOp3Bf6EBNPkmJiZeLnJNPQdOLHJWZC/IVVGF7ap4z9uHAOkQVfgHUjAxFQJSkdld1+p0WEguWleYR10PIr1ZUejjB3XpCv5LuQNTPPMOcvOy17iusNANi504pJk3TwHIZNhIEVGB9PsSImQlA4GCYs1ntA7QlIKkOVgkGcdyBIgCRkIEspMru7OkIQ4ZBhJon837t0tBlEyjLplBMJQqbEYo4M4Dir6cpLBvOyYc9Bx+g9BN9HcYJqriGSIYC5LdNmzniQkIqIY9dc6mBZ7LTBuIslgx7qqNFusxEYV9GqNozpttVg4iKWtTqcFIQPDoheWtM8hP5oum+oRaK0Yseg1Xj7guvvjhb+UlXEnnS8fjBdir5oDgMhq874VX4iZLmkPr9osuEZsuiz6glSQJs2BFw2rU91q+Bp2rMLQsM0iOr1tSFmAVwc7W3mkgdRvWD20o+/LbGZrV1Q2rMxaf63Gfqu3LzoqNrZKZOvPrIl63yKRxQ76i9xyKi3shsomqlk7GiGP169WIVFb3ceR7Wizxj7PiqhuCIyyHrOz7fDY2DfdIoH6AvcWVcmo4qIlSLlF4m0MDomgE9fHy+cZxVjtbe9/NptNnmeybYdZ5Xi6XKFmZPsejmLIbTujDVAMiKw8nk5YNFr1GFUCiQ1Qo63ksllFMxUX7Z4WccVWcp4bHgHjJ0WMKsZfwiTud+e5Ot5gBNmDniWkPN4gD4oYirIfxuagCB652aZGR7cZY6wXOdI43XorgOTnEk0P6ls3RpW4fXE6EY+BbYo0phM7PikEWWyW4oY6v/MQutODbN2BiMSVq5hMDRItsjnGPdVDnrR9yHMWx2VxYsgEDx7zbNOeODLFI9zu4xFudRdn4ofhZ3GtYB4XNGZx1WVql4bos0tDs7h+NY+LbFMKQy+vBM7kcuU8rqlGc7jwO4+r01O4hF7+dQl9Ctf5yZ/X+cfP4ckbgxFGHzFB3hkxMe6wjuS9YR3N2JMxKBPy5tiTWQyQmccoHjXUKHCH1XhC3E6jlzJBOahd4m5st1Fb2QwGbY05sqzLZLVhh23pDX+bxxg9OR9z4gMJ5zHasT0kM+mNM0nMhmS2xo321yTCIxa+4YhmObg16G9wa2A8uBW3JqY/Avcei/oZJhxaGSY8k7HM7QHX9ihxvWVzwPU8RoXPY+i6aGfZGV9PexxfLx58MH8IwO33IYCHJxUC3ScVgp6fVPjxOIXb7XEKd4jHKdrPfLTfcunyzAcquv9nPn48mBK+fjClbB5MCR8fTBn/6RkpwHGfnnl4xOfZS0PKAqfy0pD37KUhSqy/NPQf0srMsKynqUwAAAAASUVORK5CYII='




const { Title, Text, Paragraph } = Typography;

export default function Desktop() {
  const [createSubscription] = useMutation(SubscriptionCreateQuery);
  const data = useData()
  const tagListData = useTagListData()
  const router = useRouter();
  const isVerified = service.getValue(data, "isVerified", false)
  const isPromoted = service.getValue(data, "isPromoted", false)
  const decodedDescription = decodeURIComponent(service.getValue(data, "description", ""))
  const description = urlify(decodedDescription)


  const onFinish = async (value) => {
    const email = service.getValue(value, "email", "")
    const result = await createSubscription({ variables: { input: { email: email } } })
    if (result) {
      message.success({ content: "Email has been registered" })
    }
  };


  const onClickRoute = (titleId, cardTitle) => {
    router.push(`/calendar/${titleId}`);
  }


  const onClickTag = (tag) => {
    router.push(`/tag/${tag}`);
  }




  return (
    <>
      <DetailWrapper>
        <HeadInfo title={`${data.title} - NFT Drops`} name="description" contents={decodedDescription.toString()}></HeadInfo>
        <DetailRow gutter={[30, 0]}>
          <DetailCol span={24}>
            <Row gutter={[30, 0]}>
              <Col span={18}>
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
                      <Image src={whiteStar} width="25" height="25"></Image>
                    </StyledStarWrapper> : null}
                    <StyledImg
                      src={data.coverImage}
                    ></StyledImg>
                  </ImageWrapper>
                  <DetailsRow gutter={[15, 0]}>
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
                          <DetailTag>{data.blockChain}</DetailTag>
                        </Col>
                        <Col>
                          <DetailTitle>MARKET PLACE</DetailTitle>
                          <DetailTag>{data.marketName}</DetailTag>
                        </Col>
                      </Row>
                      <ProjectLinksRow>
                        <Col>
                          <DetailTitle>PROJECT LINKS:</DetailTitle>
                          <DetailTagTopRow gutter={[10, 10]}>
                            <Col >
                              <Link href={data.announcementUrl}>
                                <a target="_blank" rel="noopener noreferrer" className='link-item'>
                                  <DetailTag >
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
                                  <DetailTag >
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
                              <DescriptionDetail> {`${data.mintingPrice} ${data.unit}`} </DescriptionDetail>
                            </Descriptions.Item>
                            <Descriptions.Item
                              label={
                                <DescriptionLabel>Counts</DescriptionLabel>
                              }
                            >
                              <DescriptionDetail>{data.numberOfMinting} items</DescriptionDetail>
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
                              <DescriptionDetail> {data.category} </DescriptionDetail>
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
                        <Col span={2}>
                          <Title level={5}>Tags: </Title>
                        </Col>
                        <Col span={22}>
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
              </Col>
              <Col span={6}>
                <Advertise></Advertise>
              </Col>
            </Row>

            <SubTitle level={3}>{`Don't miss the\nnext NFT Drops`}</SubTitle>
            <StyledEmailCard bodyStyle={{ padding: 10 }}>
              <Row style={{ width: "100%" }}>
                <Col span={24}>
                  <StyledForm
                    name="customized_form_controls"
                    layout="inline"
                    onFinish={onFinish}
                  >
                    <Form.Item name="email">
                      <Row style={{ width: "100%" }}>
                        <Col span={24}>
                          <Input
                            type="email"
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
            <MoreCardsRow>
              <CarouselCol span={24}>
                <StyledCarousel draggable swipeToSlide slidesToShow={3.5} touchThreshold={1000} dots={false} infinite={false} arrows={true}>
                  {tagListData.map((tagData) => {
                    return (
                      <Link href={`/calendar/${tagData.titleId}`}>
                        <a>
                          <MoreCard>
                            <ImageWrapper>
                              {isPromoted ? <StyledMoreStarWrapper>
                                <Image src={whiteStar} width="20" height="20"></Image>
                              </StyledMoreStarWrapper> : null}
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
              </CarouselCol>

            </MoreCardsRow>
          </DetailCol>

        </DetailRow>

      </DetailWrapper >
      <Footer></Footer>
    </>
  );
}

const StyledMoreStarWrapper = styled.div(({ theme }) => {
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

const StyledStarWrapper = styled.div(({ theme }) => {
  return {
    position: "absolute",
    width: 50,
    height: 60,
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
    position: "static"
  }
})


const StyledCarousel = styled(Carousel)(({ theme }) => {
  return {
    width: 900
  }
})


const TagListImage = styled.img((theme) => {
  return {
    width: 250,
    height: 250
  }
})



const StyledImg = styled.img(({ theme }) => {
  return {
    width: 620,
    height: 620
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

const CarouselCol = styled(Col)(({ theme }) => {
  return {
    display: "flex",
    justifyContent: "center",
    // paddingRight: 55,
    height: "100%",
    ['&&& .ant-carousel']: {
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
          right: -90,
          zIndex: 100,
        },
        ['&.slick-next.slick-disabled']: {
          background: `url(${Inactive}) no-repeat`,
          backgroundSize: 'contain',
          transform: 'rotate(180deg)',
        },
        ['&.slick-prev']: {
          left: -90,
          zIndex: 100,
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



const MoreCardsRow = styled(Row)(({ theme }) => {
  return {
    flexWrap: "nowrap",
    minHeight: 300,
    marginBottom: 100,
    margin: "0 auto",
    overflowX: "scroll",
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
    cursor: "pointer"
  };
});

// const MoreCards = styled(Card)(({ theme }) => {
//   return {
//     marginBottom: 119,
//     width: "calc(100% - 300px)",
//     margin: "0 auto"
//   };
// });

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

  };
});

const DetailWrapper = styled.div(({ theme }) => {
  return {
    maxWidth: 1250,
    paddingTop: 69,
    paddingBottom: 150,
    margin: "0 auto",
  };
})



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
    padding: 10,
    width: "50%",
    margin: "0 auto"
  };
});


