// import dependency modules : package.json에 명시된 외부모듈을 선언하세요.
import { Row, Col, Typography, Card, Divider, Button } from "antd";
import styled from "styled-components";
import { useRouter } from "next/router";
import EventCard from "@src/Components/Events/EventCard"
import { nest, service } from "@src/configs"
import client from "@src/graphql/apollo";
import { getNewsList } from "@src/graphql/queries/news/getNewsList"
import { Provider, useData } from "../../Components/Events/Provider"
import { useResponse } from "@src/Components/Common/Provider/isMobile";
import Advertise from "@src/Components/Advertise";
import Footer from "@src/Components/Footer";

const { Title, Text } = Typography;

function News() {
  const isMobile = useResponse();
  const router = useRouter();
  const data = useData();

  return (
    <>
      <EventsRow>
        <EventsCol span={24}>
          <MainTitle level={1}>Latest news</MainTitle>
          <Row gutter={[isMobile ? 0 : 30, 0]}>
            <Col span={24} lg={18}>
              <EventsListRow gutter={[isMobile ? 0 : 20, 20]} >

                {data.map((event, index) => {
                  return (
                    <EventCard event={event} key={index}></EventCard>
                  )
                })}

              </EventsListRow>
            </Col>
            {!isMobile ?
              <Col span={6}>
                <Advertise></Advertise>
              </Col> : null
            }
          </Row>
        </EventsCol>
      </EventsRow>
      <Footer></Footer>
    </>
  );
}

export async function getStaticProps(context) {
  try {
    const { data } = await client.query({ query: getNewsList })
    const gotData = service.getValue(data, "newsList.edges", []).map((element) => element.node)
    // console.log("gotData", gotData)

    return {
      props: {
        data: gotData,
      },
    }
  }
  catch (error) {
    // console.log("error", error.networkError.result)
    return {
      props: {
        data: []
      }
    }
  }
}

const EventsListRow = styled(Row)(({ theme }) => {
  return {
    marginBottom: 30,
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
  return {

  };
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

export default nest(Provider, News)