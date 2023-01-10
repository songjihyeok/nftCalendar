import { useState, useCallback } from 'react';
import constate from 'constate';
import { service, values } from "@src/configs"
import dayjs from "dayjs"
import { useRouter } from 'next/router';
// state의 type을 지정해주세요.

function useDetail(props) {
  const { query: { id } } = useRouter();
  const { newsDetail, moreNews } = props

  const title = service.getValue(newsDetail, "title", "")
  const content = service.getValue(newsDetail, "content", "")
  const coverImage = values.imageUrl + "/" + service.getValue(newsDetail, "coverImage", "")
  const createdTime = dayjs(service.getValue(newsDetail, "createdDateTime", dayjs())).format("YYYY-MM-DD")
  const tags = service.getValue(newsDetail, "tags", [])

  const detailData = {
    title,
    content,
    coverImage,
    createdTime,
    tags
  }

  const moreNewsDetail = moreNews.map((element) => {
    return {
      title: service.getValue(element, "title", ""),
      id: service.getValue(element, "id", 0)
    }
  }).filter((element) => element.id !== Number(id))

  return { detailData, moreNewsDetail }
}

const [Provider, useDetailData, useMoreNewsDetail] = constate(
  // 선언한 custom hook을 주입하세요.
  useDetail,
  (value) => value.detailData,
  (value) => value.moreNewsDetail

);

export { Provider, useDetailData, useMoreNewsDetail };
