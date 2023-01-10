import constate from 'constate';
import { useState, useEffect } from "react"
import { projectListByFilter } from "@src/graphql/queries/Project/getFilteredList"
import { useQuery } from "@apollo/client"
import { service } from "@src/configs"
import { useRouter } from 'next/router'
import { ProjectListOf } from "@src/configs/types"


function useSearchSection() {
  // counter 예제입니다.
  const router = useRouter()
  const { id } = router.query

  const [filter, setFilter] = useState({ keyword: id ? id.toString() : null, blockChainIdList: [], first: 15, last: 0, before: null, after: null, of: null, isVisible: true })

  const { data, loading } = useQuery(projectListByFilter, {
    variables: { ...filter, of: ProjectListOf.TODAY },
    fetchPolicy: 'no-cache',
  });


  const hasNextPage = service.getValue(data, "projectListByFilter.pageInfo.hasNextPage", false)

  return { data, filter, setFilter, loading, hasNextPage };
}

const [Provider, useData, useFilter, useSetFilter, useLoading, useHasNextPage] = constate(
  useSearchSection,
  (value) => value.data,
  (value) => value.filter,
  (value) => value.setFilter,
  (value) => value.loading,
  (value) => value.hasNextPage
);

export { Provider, useData, useFilter, useSetFilter, useLoading, useHasNextPage };

