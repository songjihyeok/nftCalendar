// import dependency modules : package.json에 명시된 외부모듈을 선언하세요.
import { Row, Col, Button, Empty, Spin } from "antd";
import { useCallback, useMemo, useState, useEffect } from "react";
import styled from "styled-components";
import LongCard from "../longCard";
import { service } from "@src/configs"

export default function FilteredList(props) {

  const { filterListProps } = props

  const { data, loading, filter, setFilter, hasNextPage, fetchMore } = filterListProps
  const [beforeData, setBeforeData] = useState([])
  const modifiedData = service.getValue(data, "projectListByFilter.edges", []).map((element) => element.node).sort((a, b) => {
    if (a.isPromoted && !b.isPromoted) {
      return -1
    }
    if (!a.isPromoted && b.isPromoted) {
      return 1
    }
    return 0
  })

  const gotendCursor = service.getValue(data, "projectListByFilter.pageInfo.endCursor", null)

  const onLoadMore = () => {
    setBeforeData([...beforeData, ...modifiedData])
    setFilter({ ...filter, before: gotendCursor, first: 15 })
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
        {hasNextPage ? <LoadMoreButton onClick={onLoadMore}>Load more</LoadMoreButton> : null}
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
