import { useState, useCallback, useMemo } from 'react';
import constate from 'constate';
import { useMutation, useQuery } from '@apollo/client';

import { service } from '@src/configs';
import NewsListQuery from '@src/graphql/queries/admin/getNewsList';
import NewsRemoveMutation from '@src/graphql/mutation/removeNews';
import { message, Modal } from 'antd';
import { values } from './configs';
import dayjs from "dayjs"

// state의 type을 지정해주세요.

function useNews() {
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [first] = useState<number>(10);

  const { data: newsData, loading, refetch, fetchMore } = useQuery(NewsListQuery, { variables: { first } });

  const data = useMemo(() => {
    return service
      .getValue(newsData, 'list.edges', [])
      .map(obj => service.getValue(obj, 'node', {}))
      .sort((a, b) => {
        const isBefore = dayjs(a.createdDateTime as string).isBefore(b.createdDateTime as string);
        if (isBefore) {
          return 1;
        }
        if (!isBefore) {
          return -1;
        }
        return 0;
      });
  }, [newsData]);
  const { endCursor: after, hasNextPage } = useMemo(() => service.getValue(newsData, 'list.pageInfo', {}), [newsData]);

  const [removeNews] = useMutation(NewsRemoveMutation);

  const onRemove = useCallback((id) => {
    Modal.confirm({
      centered: true,
      width: 'fit-content',
      title: service.getValue(values, 'messages.remove.confirm', ''),
      async onOk() {
        try {
          await removeNews({
            variables: { id },
            context: {
              headers: {
                authorization: localStorage.getItem('nftDropsAuthorization'),
              },
            },
          });
          refetch();
          message.success(service.getValue(values, 'messages.remove.success', ''));
        } catch (e) {
          message.error(service.getValue(values, 'messages.remove.error', ''));
        }
      },
    });
  }, []);

  const onLoadMore = useCallback(() => {
    if (hasNextPage) {
      fetchMore({
        variables: {
          after,
          first,
        },
      });
    }
  }, [hasNextPage, after]);

  return {
    visible,
    setVisible,
    selectedId,
    setSelectedId,
    data,
    loading,
    hasNextPage,
    onRemove,
    onLoadMore,
  };
}

const [
  Provider,
  useVisible,
  useSetVisible,
  useSelectedId,
  useSetSelectedId,
  useData,
  useLoading,
  useHasNextPage,
  useOnRemove,
  useOnLoadMore
] = constate(
  useNews,
  (value) => value.visible,
  (value) => value.setVisible,
  (value) => value.selectedId,
  (value) => value.setSelectedId,
  (value) => value.data,
  (value) => value.loading,
  (value) => value.hasNextPage,
  (value) => value.onRemove,
  (value) => value.onLoadMore,
);

export {
  Provider,
  useVisible,
  useSetVisible,
  useSelectedId,
  useSetSelectedId,
  useData,
  useLoading,
  useHasNextPage,
  useOnRemove,
  useOnLoadMore
};
