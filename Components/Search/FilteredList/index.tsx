// import dependency modules : package.json에 명시된 외부모듈을 선언하세요.
import { Row, Col, Button, Empty, Spin } from "antd";
import { useCallback, useMemo, useState, useEffect } from "react";
import styled from "styled-components";
import LongCard from "@src/Components/SearchSection/longCard"
import { useData, useLoading, useHasNextPage, useFilter, useSetFilter } from "../Provider"
import { service } from "@src/configs"

export default function FilteredList() {

  const data = useData()
  const loading = useLoading()
  const filter = useFilter()
  const { first, last } = filter
  const setFilter = useSetFilter()
  const hasNextPage = useHasNextPage()
  const [beforeData, setBeforeData] = useState([])
  // console.log("first", first)
  // console.log("last", last)
  // console.log("data", data)
  // console.log("beforeData", beforeData)
  const modifiedData = service.getValue(data, "projectListByFilter.edges", []).map((element) => element.node)
  const lastData = beforeData[beforeData.length - 1]

  // console.log("modifiedData", modifiedData)
  // console.log("lastData", lastData)
  const onLoadMore = () => {
    const endCursor = service.getValue(data, "projectListByFilter.pageInfo.endCursor", "")

    // console.log("endCurser", endCursor)

    setFilter({ ...filter, after: endCursor, first: last, last: last + 10 })
    setBeforeData([...beforeData, ...modifiedData])
  }

  const getBeforeDataList = useCallback(() => {
    return beforeData.map((cardData, index) => {
      return <LongCard key={index} data={cardData} />
    })
  }, [beforeData])



  const getDataList = useCallback(() => {

    if (loading) {
      return <CenterWrapper><Spin /></CenterWrapper>
    }
    if (modifiedData.length === 0) {
      return <CenterWrapper><Empty /></CenterWrapper>
    } else {
      return modifiedData.map((cardData, index) => {
        return <LongCard key={index} data={cardData} />
      })
    }
  }, [data])

  const dataList = useMemo(() => getDataList(), [getDataList])
  const beforeDataList = useMemo(() => getBeforeDataList(), [getBeforeDataList])

  return (
    <FilteredListRow>
      <Col span={24}>
        {beforeDataList}
        {dataList}
        {hasNextPage && modifiedData.length === 10 ? <LoadMoreButton onClick={onLoadMore}>Load more</LoadMoreButton> : null}
      </Col>
    </FilteredListRow>
  );
}

const LoadMoreButton = styled(Button)(({ theme }) => {
  return {
    background: theme.buttonColor,
    width: "100%",
    height: 61,
    borderRadius: 15,
    fontSize: 15,
    color: "white",
  };
});

const FilteredListRow = styled(Row)(({ theme }) => {
  return {
    minHeight: 500
  };
});

const CenterWrapper = styled.div(({ theme }) => {
  return {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex"
  }
})
