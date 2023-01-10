import constate from 'constate';
import { useState, useEffect } from "react"
import { projectListByFilter } from "@src/graphql/queries/Project/getFilteredList"
import { useQuery } from "@apollo/client"
import { service } from "@src/configs"
import { useRouter } from 'next/router'
import { ProjectListOf } from "@src/configs/types"


function useTagSearchList() {
  // counter 예제입니다.
  const router = useRouter()
  const [filter, setFilter] = useState({ blockChainIdList: [], first: 10000, of: ProjectListOf.NEWEST, isVerified: true, tagList: [], after: null, before: null })

  const { data, loading } = useQuery(projectListByFilter, {
    variables: { ...filter },
    fetchPolicy: 'network-only',
  });


  const hasNextPage = service.getValue(data, "projectListByFilter.pageInfo.hasNextPage", false)

  return { data, filter, setFilter, loading, hasNextPage };
}

const [Provider, useData, useFilter, useSetFilter, useLoading, useHasNextPage] = constate(
  useTagSearchList,
  (value) => value.data,
  (value) => value.filter,
  (value) => value.setFilter,
  (value) => value.loading,
  (value) => value.hasNextPage
);

export { Provider, useData, useFilter, useSetFilter, useLoading, useHasNextPage };

