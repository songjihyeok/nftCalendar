import { useState, useCallback } from 'react';
import constate from 'constate';
import { useMutation } from '@apollo/client';
import { Modal, Form, message } from 'antd';
import dayjs from 'dayjs';

import { service } from '@src/configs';
import ListQuery from '@src/graphql/queries/admin/getDropsList';
import CreateMutation from '@src/graphql/mutation/createDrops';
import UpdateMutation from '@src/graphql/mutation/updateDrops';

import { values } from '../configs';
import { useSetVisible, useSelectedId, useSetSelectedId } from '../Provider';

// state의 type을 지정해주세요.

function useDropsModal() {
  const setVisible = useSetVisible();
  const selectedId = useSelectedId();
  const setSelectedId = useSetSelectedId();
  const [form] = Form.useForm();
  const [fileId, setFileId] = useState<string | null>(null);

  const modalType = selectedId ? 'modify' : 'create';

  const [createDrops] = useMutation(CreateMutation, {
    update(cache, { data: { created } }) {
      const data = service.getValue(cache.readQuery({ query: ListQuery }), 'list', []);
      cache.writeQuery({
        query: ListQuery,
        data: {
          list: {
            totalCount: service.getValue(data, 'totalCount', 0) + 1,
            edges: [
              { node: { ...created } },
              ...service.getValue(data, 'edges', []),
            ],
          },
        },
      });
    },
  });

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
  });

  const onOk = useCallback(() => {
    form.submit();
  }, []);

  const onCancel = useCallback(() => {
    setVisible(false);
  }, []);

  const onFinish = useCallback(({ image, startEndDateTime, ...fields }: any) => {
    if (modalType === 'create' && !fileId) {
      message.warn('Cover image is required.');
      return;
    }

    if (dayjs(startEndDateTime[0]).format('YYYY-MM-DD') >= dayjs(startEndDateTime[1]).format('YYYY-MM-DD')) {
      message.warn('Please set the correct date range.');
      return;
    }

    Modal.confirm({
      centered: true,
      width: 'fit-content',
      title: service.getValue(values, `messages.${modalType}.confirm`, ''),
      async onOk() {
        try {
          if (modalType === 'create') {
            await createDrops({
              variables: {
                input: {
                  ...fields,
                  startDateTime: dayjs(startEndDateTime[0]).format('YYYY-MM-DDT00:00:00.000Z'),
                  endDateTime: dayjs(startEndDateTime[1]).format('YYYY-MM-DDT00:00:00.000Z'),
                  mintingPrice: +fields.mintingPrice,
                  coverImage: fileId,
                },
              },
              context: {
                headers: {
                  authorization: localStorage.getItem('nftDropsAuthorization'),
                },
              },
            });
          } else {
            await updateDrops({
              variables: {
                id: selectedId,
                input: {
                  ...fields,
                  startDateTime: dayjs(startEndDateTime[0]).format('YYYY-MM-DDT00:00:00.000Z'),
                  endDateTime: dayjs(startEndDateTime[1]).format('YYYY-MM-DDT00:00:00.000Z'),
                  mintingPrice: +fields.mintingPrice,
                  ...(fileId ? { coverImage: fileId } : null),
                },
              },
              context: {
                headers: {
                  authorization: localStorage.getItem('nftDropsAuthorization'),
                },
              },
            });
          }

          message.success(service.getValue(values, `messages.${modalType}.success`, ''));
        } catch (e) {
          message.error(service.getValue(values, `messages.${modalType}.error`, ''));
        } finally {
          setVisible(false);
        }
      },
    })
  }, [fileId, modalType, selectedId]);

  return { form, fileId, setFileId, onOk, onCancel, onFinish };
}

const [Provider, useForm, useFileId, useSetFileId, useOnOk, useOnCancel, useOnFinish] = constate(
  useDropsModal,
  (value) => value.form,
  (value) => value.fileId,
  (value) => value.setFileId,
  (value) => value.onOk,
  (value) => value.onCancel,
  (value) => value.onFinish,
);

export { Provider, useForm, useFileId, useSetFileId, useOnOk, useOnCancel, useOnFinish };
