import type { GetStaticPaths } from "next";
import Desktop from "@src/Components/Events/Detail/Desktop";
import Mobile from "@src/Components/Events/Detail/Mobile";
import { useResponse } from "Components/Common/Provider/isMobile";
import client from "@src/graphql/apollo";
import { getNewsList } from "@src/graphql/queries/news/getNewsList"
import { service, nest } from "@src/configs"
import { Provider } from "@src/Components/Events/Detail/Provider"

function Events() {
  const isMobile = useResponse();
  return <>{isMobile ? <Mobile /> : <Desktop />}</>;
}



export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({ query: getNewsList })
  const gotData = service.getValue(data, "newsList.edges", []).map((element) => element.node)

  const paths = gotData.map((event) => ({
    params: { id: event.id.toString() }
  }))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps(context) {
  try {
    const id = service.getValue(context, "params.id", 0)
    const { data } = await client.query({ query: getNewsList })
    const gotData = service.getValue(data, "newsList.edges", []).map((element) => element.node)
    const newsDetail = gotData.find((element) => element?.id.toString() === id.toString())
    const moreNews = gotData.filter((element) => element?.id.toString() !== id.toString()).slice(0, 3)

    return {
      props: {
        newsDetail: newsDetail,
        moreNews: moreNews
      }
    }
  }
  catch (error) {
    return {
      props: {
        data: []
      }
    }
  }
}

export default nest(Provider, Events)