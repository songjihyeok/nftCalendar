import constate from 'constate';
import { useState, useEffect } from "react"
import { projectListByFilter } from "@src/graphql/queries/Project/getFilteredList"
import { useQuery } from "@apollo/client"
import { service } from "@src/configs"
// state의 type을 지정해주세요.
enum ProjectListOf {
  NEWEST = "NEWEST",
  PAST = "PAST",
  PROMOTED = "PROMOTED",
  TODAY = "TODAY",
  UPCOMING = "UPCOMING",
  VERIFIED = "VERIFIED",
}
function useSearchSection() {
  // counter 예제입니다.

  const [filter, setFilter] = useState({ keyword: null, blockChainIdList: [], first: 15, isVisible: true, isVerified: false, before: null, after: null, last: null, of: ProjectListOf.NEWEST })

  const { data, loading, fetchMore } = useQuery(projectListByFilter, {
    variables: {
      ...filter
    },
    fetchPolicy: "no-cache"
  });



  const hasNextPage = service.getValue(data, "projectListByFilter.pageInfo.hasNextPage", false)

  return { data, filter, setFilter, loading, hasNextPage, fetchMore };
}

const [Provider, useData, useFilter, useSetFilter, useLoading, useHasNextPage, useFetchMore] = constate(
  useSearchSection,
  (value) => value.data,
  (value) => value.filter,
  (value) => value.setFilter,
  (value) => value.loading,
  (value) => value.hasNextPage,
  (value) => value.fetchMore
);

export { Provider, useData, useFilter, useSetFilter, useLoading, useHasNextPage, useFetchMore };
