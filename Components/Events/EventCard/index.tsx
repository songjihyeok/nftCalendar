import { Row, Col, Typography, Card, Divider, Button } from "antd";
import styled from "styled-components";
import Image from "next/image";
import dayjs from "dayjs"
import Link from 'next/link'
import { useRouter } from "next/router";
import { service, values } from "@src/configs"
const { Title, Text } = Typography

export default function EventCard(props) {

  const { event } = props

  const router = useRouter();
  const id = service.getValue(event, "id", 1)


  const title = service.getValue(event, "title", "")
  const newsImage = `${values.imageUrl}/${service.getValue(event, "coverImage", "")}`
  const createdData = dayjs(service.getValue(event, "createdDateTime", dayjs())).format("YYYY-MM-DD")

  return (
    <Col span={24} lg={8}>
      <Link href={`/news/${id}`}>
        <a>
          <StyledCard bodyStyle={{ padding: 10 }}>
            <ImageWrapper>
              <StyledImage src={newsImage} />
            </ImageWrapper>

            <NewsTitle ellipsis={{ rows: 3 }}>
              {title}
            </NewsTitle>
            <StyledDivider></StyledDivider>
            <NewsBottomRow>
              <Col>
                <DayText>{createdData}</DayText>
              </Col>
              <Col>
                <ReadMoreButton>Read More</ReadMoreButton>
              </Col>
            </NewsBottomRow>
          </StyledCard>
        </a>
      </Link>
    </Col>
  );
}

// 함수로 작성한 styled component를 선언하세요.

const StyledImage = styled.img(({ theme }) => {
  return {
    width: "100%",
    height: "100%"
  }
})

const ImageWrapper = styled.div(({ theme }) => {
  return {
    width: "100%",
    minHeight: 270
  }
})



const DayText = styled(Text)(({ theme }) => {
  return {
    color: "rgba(0, 0, 0, 0.15)",
  };
});

const NewsBottomRow = styled(Row)(({ theme }) => {
  return {
    justifyContent: "space-between",
  };
});

const ReadMoreButton = styled(Button)(({ theme }) => {
  return {
    background: theme.subColor,
    color: "white",
    borderRadius: 5,
  };
});



const StyledDivider = styled(Divider)(({ theme }) => {
  return {
    margin: "15px 0px",
  };
});

const NewsTitle = styled(Title)(({ theme }) => {
  return {
    ["&&"]: {
      fontSize: 18,
      marginTop: 21,
      height: 66.4,
    },
  };
});

const StyledCard = styled(Card)(({ theme }) => {
  return {
    ["&&"]: {
      width: "100%",
      borderRadius: 15,
      cursor: "pointer",
      [`@media (max-width: ${theme.mobileMedia})`]: {
        maxWidth: "92%",
        margin: "0 auto",
      }
    },
  };
});

const EventsCol = styled(Col)(({ theme }) => {
  return {
    maxWidth: 1250,
    margin: "0 auto",
  };
});

// 함수로 작성한 styled component를 선언하세요.
const EventsRow = styled(Row)(({ theme }) => {
  return {};
});

const MainTitle = styled(Title)(({ theme }) => {
  return {
    ["&&"]: {
      textAlign: "center",
      color: theme.mainTextColor,
      marginBottom: 23,
    },
  };
});
