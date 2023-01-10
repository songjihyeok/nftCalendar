import type { GetStaticPaths } from "next";
import Desktop from "@src/Components/Detail/Desktop";
import Mobile from "@src/Components/Detail/Mobile";
import { useResponse } from "Components/Common/Provider/isMobile";
import { nest, service } from "@src/configs"
import { Provider } from "@src/Components/Detail/Provider"
import client from "@src/graphql/apollo";

import { projectIdList } from "@src/graphql/queries/Project/getPojectIdList"
import { projectDetail } from "@src/graphql/queries/Project/getProjectDetailById"

function Detail() {
  const isMobile = useResponse();
  return <>    {isMobile ? <Mobile /> : <Desktop />}</>;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({ query: projectIdList, variables: { of: "NEWEST", visible: true } })
  const gotData = service.getValue(data, "projectListByFilter.edges", [])
    .map((element) => element.node)

  const paths = gotData.map((project) => {
    const titleId = service.getValue(project, "titleId", "")

    if (titleId.length > 1 && titleId[titleId.length - 1] === "-") {
      return {
        params: { "titleId": titleId.slice(0, -1) }
      }
    }
    return {
      params: {
        "titleId": titleId
      }
    }
  })

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps(context) {
  try {
    const titleId = service.getValue(context, "params.titleId", "")
    const { data } = await client.query({ query: projectDetail, variables: { titleId: titleId } })

    const gotData = service.getValue(data, "projectByTitleId", [])

    return {
      props: {
        data: gotData,
      },
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





export default nest(Provider, Detail)


