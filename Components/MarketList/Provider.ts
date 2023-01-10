import { useState, useCallback } from 'react';
import constate from 'constate';
import { projectListByFilter } from "@src/graphql/queries/Project/getFilteredList"
import { ProjectListOf } from "@src/configs/types"
import { useQuery } from "@apollo/client"
import { service } from "configs"
// state의 type을 지정해주세요.

function useMarketList() {
  // counter 예제입니다.
  const { data } = useQuery(projectListByFilter, {
    variables: { of: ProjectListOf.NEWEST, first: 1000 },
    fetchPolicy: 'network-only',
  });


  const gotData = service.getValue(data, "projectListByFilter.edges", []).map((element) => element.node)

  const marketFilteredData = gotData.reduce((result, current) => {
    const marketId = current.marketplaceId
    const found = Object.keys(result).find(element => Number(element) === marketId)
    if (!found) {
      return { ...result, [marketId]: [current] }
    }
    if (found && result[marketId].length < 3) {
      return { ...result, [marketId]: [...result[marketId], current] }
    }
    return { ...result }
  }, {})

  return { marketFilteredData };
}

const [Provider, useData] = constate(
  // 선언한 custom hook을 주입하세요.
  useMarketList,
  // custom hook에서 반환한 값을 selector로 지정하세요.
  // custom hook의 API로 사용될 수 있게 각각의 selector를 기술해주세요.
  (value) => value.marketFilteredData, // 현재 count 값 읽기

);

export { Provider, useData };
