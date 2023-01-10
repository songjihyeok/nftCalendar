// import dependency modules : package.json에 명시된 외부모듈을 선언하세요.
import { useCallback, useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Row, Switch, Table, TableProps, Popconfirm, PopconfirmProps, Button, message, Affix, ButtonProps } from 'antd';
import Text from 'antd/lib/typography/Text';
import UpdateMutation from '@src/graphql/mutation/updateDrops';
import { PlusOutlined } from '@ant-design/icons';
import ListQuery from '@src/graphql/queries/admin/getDropsList';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';

import dayjs from 'dayjs';

// import global modules : 서비스 전역에서 사용중인 모듈을 선언하세요.
import { service } from '@src/configs';

// import local modules : 지역(route)에서 사용중인 모듈을 선언하세요.
import { values } from '../configs';
import { useSetVisible, useSetSelectedId, useAfter, useData, useLoading, useRefetch, useFetchMore, useHasNextPage, useRemoveDrops } from '../Provider';

export default function List() {
  const router = useRouter();
  const setVisible = useSetVisible();
  const setSelectedId = useSetSelectedId();
  const data = useData();
  const loading = useLoading();
  const refetch = useRefetch();
  const removeDrops = useRemoveDrops();
  // const total = 10
  const [updateDrops] = useMutation(UpdateMutation, {
    update(cache, { data: { updated } }) {
      const data = service.getValue(cache.readQuery({ query: ListQuery }), 'list', []);
      cache.writeQuery({
        query: ListQuery,
        data: {
          list: {
            ...data,
            edges: service.getValue(data, 'edges', []).map(obj => {
              if (service.getValue(obj, 'node.id', 0) === updated.id) {
                return {
                  ...obj,
                  node: { ...updated },
                };
              }
              return obj;
            }),
          },
        },
      });
    },
  })


  const onClickSwitch = (e) => {
    e.stopPropagation()
  }

  const onClickDetail = (id) => {
    setSelectedId(+id);
    router.push(`/admin/drops/detail/${id}`);
  }


  const changeSwitch = (value, key, record) => {
    const { isVisible, isVerified, isPromoted } = record

    const keyObject = { isVisible, isVerified, isPromoted }

    updateDrops({
      variables: { id: record.id, input: { ...keyObject, [key]: value } },
      context: {
        headers: {
          authorization: localStorage.getItem('nftDropsAuthorization'),
        },
      },
    })
  }


  const getColumns = useCallback(() => {
    return values.columns.map(column => {
      const key = service.getValue(column, 'key', '');

      if (['isPromoted', 'isVerified', "isVisible"].includes(key)) {
        return {
          ...column,
          render(value: boolean, record: any) {
            return <div onClick={onClickSwitch} style={{ height: "100%" }}>
              <StyledSwitch checkedChildren="예" unCheckedChildren="아니오" defaultChecked={value} onClick={(value) => changeSwitch(value, key, record)} />
            </div>
          },
        };
      }

      if (['startDateTime', 'endDateTime'].includes(key)) {
        return {
          ...column,
          render(value: string) {
            return <Text>{dayjs(value).format('YYYY-MM-DD')}</Text>;
          },
        };
      }

      if (["createdDateTime"].includes(key)) {
        return {
          ...column,
          render(value: string) {
            return <Text>{dayjs(value).format('YYYY-MM-DD-HH:mm:ss')}</Text>;
          },
        };
      }

      if (key === "detail") {
        return {
          ...column,
          render(_: any, { id }: any) {
            return <Button onClick={() => onClickDetail(id)}>자세히 보기</Button>
          }
        }
      }


      if (key === 'remove') {
        return {
          ...column,
          render(_: any, { id }: any) {
            const popconfirmProps: PopconfirmProps = {
              title: <RemoveText>{service.getValue(values, 'messages.remove.confirm', '')}</RemoveText>,
              onCancel(e) {
                e.stopPropagation();
              },
              async onConfirm(e) {
                e.stopPropagation();
                try {
                  await removeDrops({
                    variables: { id },
                    context: {
                      headers: {
                        authorization: localStorage.getItem('nftDropsAuthorization'),
                      },
                    },
                  });
                  message.success(service.getValue(values, 'messages.remove.success', ''));
                  refetch();
                } catch (e) {
                  message.error(service.getValue(values, 'messages.remove.error', ''));
                }
              },
            };

            return (
              <Popconfirm {...popconfirmProps}>
                <Button onClick={(e) => e.stopPropagation()}>Remove</Button>
              </Popconfirm>
            );
          },
        };
      }

      return column;
    });
  }, []);
  const mergedColumns = useMemo(getColumns, [getColumns]);

  const tableProps = {
    bordered: true,
    loading,
    columns: mergedColumns,
    dataSource: service.wrapList(data),
  };

  return (
    <>
      <StyledTable {...tableProps} />
      <StyledAffix>
        <Button icon={<PlusOutlined />} onClick={() => setVisible(true)}>Add drops</Button>
      </StyledAffix>
    </>
  );
}

const StyledSwitch = styled(Switch)(({ theme }) => {
  return {
    width: 65
  }
})


// 함수로 작성한 styled component를 선언하세요.
const StyledTable = styled(Table)(({ theme }) => ({
  ['.ant-table-footer']: {
    textAlign: 'center',
  },
}));

const RemoveText = styled(Text)(({ theme }) => ({
  color: 'red',
}));

const StyledAffix = styled.div(({ theme }) => ({
  position: 'absolute',
  right: 20,
  bottom: 20,
  backgroundColor: '#1077ff',
  borderRadius: 30,
  padding: '15px 20px',
  boxShadow: '1px 2px 5px 1px grey',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  ['.ant-btn']: {
    backgroundColor: '#1077ff',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    height: 'fit-content',
    border: 'none',
    padding: 0,
    transition: 'all 0.2s ease',
  },
  [':hover']: {
    backgroundColor: '#4c99ff',
    ['.ant-btn']: {
      backgroundColor: '#4c99ff',
    },
  },
}));