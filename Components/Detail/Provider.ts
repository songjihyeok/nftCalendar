import { useState, useCallback } from 'react';
import constate from 'constate';
import dayjs from "dayjs"
import { service, values } from "@src/configs"
import { useQuery } from "@apollo/client"
import { projectListByFilter } from "@src/graphql/queries/Project/getFilteredList"
import { useRouter } from 'next/router';
function useDetail(props) {
  // counter 예제입니다.
  const { data } = props
  const { query: { titleId } } = useRouter();
  const tags = service.getValue(data, "tags", [])
  const { data: tagList } = useQuery(projectListByFilter, {
    variables: { keyword: null, blockChainIdList: [], first: 10, last: null, before: null, after: null, tagList: tags, },
    fetchPolicy: 'network-only',
    skip: tags.length === 0
  });

  const gotTagListData = service.getValue(tagList, "projectListByFilter.edges", []).map((element) => element?.node).filter((element) => {
    return element.titleId !== titleId
  })

  const title = service.getValue(data, "title", "")
  const startDate = dayjs(service.getValue(data, "startDateTime", dayjs()))
  const endDate = dayjs(service.getValue(data, "endDateTime", dayjs()))
  const blockChain = values.BlockChainMap[service.getValue(data, "blockchainId", 1)]
  const marketName = values.marketMap.find((element) => element.id === service.getValue(data, "marketplaceId", 1)).title
  const announcementUrl = service.getValue(data, "announcementUrl", "")
  const coverImage = values.imageUrl + "/" + service.getValue(data, "coverImage", "")
  const isPromoted = service.getValue(data, "isPromoted", false)
  const isVerified = service.getValue(data, "isVerified", false)
  const marketplaceUrl = service.getValue(data, "marketplaceUrl", "")
  const mintingPrice = service.amount(service.getValue(data, "mintingPrice", 0), 2)
  const numberOfMinting = service.amount(service.getValue(data, "numberOfMinting", 0), 0)
  const twitterUrl = service.getValue(data, "twitterUrl", "")
  const webSiteUrl = service.getValue(data, "websiteUrl", "")
  const discordUrl = service.getValue(data, "discordUrl", "")
  const category = service.getValue(data, "category", "")
  const unit = values.unitMap[service.getValue(data, "blockchainId", 1)]
  const description = service.getValue(data, "description", "")

  const modifiedData = {
    title,
    startDate,
    endDate,
    blockChain,
    marketName,
    announcementUrl,
    coverImage,
    isPromoted,
    isVerified,
    marketplaceUrl,
    mintingPrice,
    numberOfMinting,
    tags,
    twitterUrl,
    webSiteUrl,
    discordUrl,
    unit,
    category,
    description
  }

  // console.log(modifiedData)

  return { modifiedData, gotTagListData };
}

const [Provider, useData, useTagListData] = constate(
  // 선언한 custom hook을 주입하세요.
  useDetail,
  (value) => value.modifiedData,
  (value) => value.gotTagListData
  // custom hook에서 반환한 값을 selector로 지정하세요.
  // custom hook의 API로 사용될 수 있게 각각의 selector를 기술해주세요.
  // (value) => value.count, // 현재 count 값 읽기
);

export { Provider, useData, useTagListData };
