import { useState, useCallback } from 'react';
import constate from 'constate';
import { Modal, Form, message } from 'antd';

import { service } from '@src/configs';
import ListQuery from '@src/graphql/queries/admin/getNewsList';
import CreateMutation from '@src/graphql/mutation/createNews';
import UpdateMutation from '@src/graphql/mutation/updateNews';

import { values } from '../configs';
import { useSelectedId, useSetSelectedId, useSetVisible } from '../Provider';
import { useMutation } from '@apollo/client';
import createNews from '@src/graphql/mutation/createNews';

// state의 type을 지정해주세요.

function useEditModal() {
  const selectedId = useSelectedId();
  const setSelectedId = useSetSelectedId();
  const setVisible = useSetVisible();
  const [form] = Form.useForm();
  const [fileId, setFileId] = useState<string | null>(null);

  const modalType = selectedId ? 'modify' : 'create';

  const [createNews] = useMutation(CreateMutation, {
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

  const [updateNews] = useMutation(UpdateMutation, {
    update(cache, { data: { item } }) {
      const data = service.getValue(cache.readQuery({ query: ListQuery }), 'list', {});
      cache.writeQuery({
        query: ListQuery,
        data: {
          list: {
            ...data,
            edges: service.getValue(data, 'edges', []).map(obj => {
              if (service.getValue(obj, 'node.id', 0) === item.id) {
                return {
                  ...obj,
                  node: { ...item },
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
  }, [form]);

  const onCancel = useCallback(() => {
    setVisible(false);
  }, []);

  const afterClose = useCallback(() => {
    setSelectedId(null);
  }, []);

  const onFinish = useCallback(({ image, ...fields }: any) => {
    if (modalType === 'create' && !fileId) {
      message.warn('Cover image is required.');
      return;
    }

    Modal.confirm({
      centered: true,
      width: 'fit-content',
      title: service.getValue(values, `messages.${modalType}.confirm`, ''),
      async onOk() {
        try {
          if (selectedId) {
            await updateNews({
              variables: {
                id: selectedId,
                input: {
                  ...fields,
                  ...(fileId ? { coverImage: fileId } : null),
                },
              },
              context: {
                headers: {
                  authorization: localStorage.getItem('nftDropsAuthorization'),
                },
              },
            });
          } else {
            await createNews({
              variables: {
                input: {
                  ...fields,
                  coverImage: fileId,
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

  return { form, fileId, setFileId, onOk, onCancel, afterClose, onFinish };
}

const [Provider, useForm, useFileId, useSetFileId, useOnOk, useOnCancel, useAfterClose, useOnFinish] = constate(
  useEditModal,
  (value) => value.form,
  (value) => value.fileId,
  (value) => value.setFileId,
  (value) => value.onOk,
  (value) => value.onCancel,
  (value) => value.afterClose,
  (value) => value.onFinish,
);

export { Provider, useForm, useFileId, useSetFileId, useOnOk, useOnCancel, useAfterClose, useOnFinish };
