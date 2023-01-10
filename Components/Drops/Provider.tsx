import { useState, useCallback, useMemo, useEffect } from 'react';
import constate from 'constate';
import { useMutation, useQuery } from '@apollo/client';

import { service } from '@src/configs';
import ListQuery from '@src/graphql/queries/admin/getDropsList';
import RemoveMutation from '@src/graphql/mutation/removeDrops';
import dayjs from "dayjs"
// state의 type을 지정해주세요.

function useDrops() {
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [first, setFirst] = useState(null)
  const { data: countData } = useQuery(ListQuery);

  const { data: dropsData, loading, refetch, fetchMore } = useQuery(ListQuery,
    {
      variables: {
        of: "NEWEST",
        first: 1000000
      }
    }
  );

  // useEffect(() => {
  //   refetch()
  // }, [first])



  // useEffect(() => {
  //   const gotCount = service.getValue(countData, 'list.totalCount', null)
  //   setFirst(gotCount)
  // }, [countData])


  const data = useMemo(() => {
    return service
      .getValue(dropsData, 'list.edges', [])
      .map(obj => service.getValue(obj, 'node', {}))
    // .sort((a, b) => {
    //   const isBefore = dayjs(a.createdDateTime as string).isBefore(b.createdDateTime as string);
    //   if (isBefore) {
    //     return 1;
    //   }
    //   if (!isBefore) {
    //     return -1;
    //   }
    //   return 0;
    // });
  }, [dropsData]);

  const { endCursor: after, hasNextPage } = useMemo(() => service.getValue(dropsData, 'list.pageInfo', {}), [dropsData]);


  const [removeDrops] = useMutation(RemoveMutation);

  return { visible, setVisible, selectedId, setSelectedId, after, data, loading, refetch, fetchMore, hasNextPage, removeDrops };
}

const [Provider, useVisible, useSetVisible, useSelectedId, useSetSelectedId, useAfter, useData, useLoading, useRefetch, useFetchMore, useHasNextPage, useRemoveDrops] = constate(
  useDrops,
  (value) => value.visible,
  (value) => value.setVisible,
  (value) => value.selectedId,
  (value) => value.setSelectedId,
  (value) => value.after,
  (value) => value.data,
  (value) => value.loading,
  (value) => value.refetch,
  (value) => value.fetchMore,
  (value) => value.hasNextPage,
  (value) => value.removeDrops,
);

export { Provider, useVisible, useSetVisible, useSelectedId, useSetSelectedId, useAfter, useData, useLoading, useRefetch, useFetchMore, useHasNextPage, useRemoveDrops };
