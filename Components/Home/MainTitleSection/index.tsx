// import dependency modules : package.json에 명시된 외부모듈을 선언하세요.
import { Row, Col, Typography, Spin, Button, Carousel, Empty } from "antd";
import styled from "styled-components";
import Image from "next/image";
// import global modules : 서비스 전역에서 사용중인 모듈을 선언하세요.
import Icon, { StarOutlined } from "@ant-design/icons";
import Link from 'next/link'
// import local modules : 지역(route)에서 사용중인 모듈을 선언하세요.
import { values } from "./configs";
import MainCard from "./MainCard"
import { useRouter } from "next/router";
import { useData } from "../Provider"
import { useResponse } from "@src/Components/Common/Provider/isMobile";
const Inactive = 'data:image/png;base64,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'
const active = 'data:image/png;base64,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'


const { Title, Paragraph, Text } = Typography;

export default function MainTitleSection() {
  const router = useRouter()
  const isMobile = useResponse()
  const data = useData()
  const onClickForm = () => {
    router.push("/forms");
  }

  const mainTitleData = data.slice(0, 6)

  return (
    <Row>
      <TextCol span={24} lg={8}>
        <MainTitle> {values.values.main.title}</MainTitle>
        <SubTitle> {values.values.main.subTitle}</SubTitle>
        <SubTitle> {values.values.main.subTitle2}</SubTitle>
        <Description>{values.values.main.description}</Description>
        <Link href={`/forms`}>
          <a>
            <UpcomingButton onClick={onClickForm}>{values.values.main.button}</UpcomingButton>
          </a>
        </Link>
      </TextCol>
      <CardsCol span={24} lg={16} >
        <StyledCarousel draggable swipeToSlide slidesToShow={isMobile ? 1 : 2} slidesToScroll={isMobile ? 1 : 2} touchThreshold={10} dots={false} infinite={false} arrows={true}>
          {
            mainTitleData.map((element, index) => {
              return <div key={index}>
                <CardRow gutter={[isMobile ? 0 : 15, 0]}>
                  <MainCard data={element}></MainCard>
                </CardRow>
              </div>
            })
          }
        </StyledCarousel>
      </CardsCol>
    </Row >
  );
}

const StyledCarousel = styled(Carousel)(({ theme }) => {
  return {
    width: 650,
    height: 562,
    [`@media (max-width: ${theme.mobileMedia})`]: {
      width: 330
    }
  }
})




const UpcomingButton = styled(Button)(({ theme }) => {
  return {
    ["&&"]: {
      background: theme.buttonColor,
      color: "white",
      width: 201,
      height: 51,
      fontSize: 16.5,
      borderRadius: 10,
      marginTop: 30,
      [`@media (max-width: ${theme.mobileMedia})`]: {
        marginTop: 34,
        width: "100%",
      },
    },
  };
});


const CardRow = styled(Row)(({ theme }) => {
  return {
    // height: "100%",
    justifyContent: "center",
    [`@media (max-width: ${theme.mobileMedia})`]: {
      width: "100%",
    },
  };
});


const Description = styled(Paragraph)(({ theme }) => {
  return {
    marginTop: 33,
    color: "#7d92b1",
    [`@media (max-width: ${theme.mobileMedia})`]: {
      fontSize: 15,
    },
  };
});

const MainTitle = styled(Title)(({ theme }) => {
  return {
    ["&&"]: {
      color: "#123b77",
      marginBottom: 57,
      [`@media (max-width: ${theme.mobileMedia})`]: {
        marginBottom: 30,
        fontSize: 30,
      },
    },
  };
});

const SubTitle = styled(Title)(({ theme }) => {
  return {
    ["&&&&"]: {
      marginBottom: 0,
      marginTop: 0,
      color: "#123b77",
      [`@media (max-width: ${theme.mobileMedia})`]: {
        fontSize: 30,
      },
    },
  };
});

const TextCol = styled(Col)(({ theme }) => {
  return {
    ["&&"]: {
      color: "#123b77",
      [`@media (max-width: ${theme.mobileMedia})`]: {
        textAlign: "center",
      },
    },
  };
});

const CardsCol = styled(Col)(({ theme }) => {
  return {
    display: "flex",
    justifyContent: "flex-end",
    // paddingRight: 55,
    height: "100%",
    ['& .ant-carousel']: {
      ['.slick-arrow']: {
        top: 301,
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
    [`@media (max-width: ${theme.mobileMedia})`]: {
      justifyContent: "center",
      marginTop: 50,
      marginBottom: 30,
      ['& .ant-carousel']: {
        ['.slick-arrow']: {
          ['&.slick-next']: {
            right: -15,
            zIndex: 30,
          },
          ['&.slick-prev']: {
            left: -15,
            zIndex: 30,
            background: `url(${active})`,
            backgroundSize: 'contain',
            transform: 'rotate(180deg)',
          },
        }
      }
    },
  };
});
