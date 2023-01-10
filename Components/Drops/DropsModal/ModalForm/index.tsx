// import dependency modules : package.json에 명시된 외부모듈을 선언하세요.
import { useCallback, useMemo } from 'react';
import { FilePond, FilePondProps } from 'react-filepond';
import { Form, FormProps, FormItemProps, Select } from 'antd';
import styled from 'styled-components';
import dayjs from 'dayjs';

// import global modules : 서비스 전역에서 사용중인 모듈을 선언하세요.
import { service, nest } from '@src/configs';
import { useTagList } from '@src/Components/Common/Provider/isMobile';
import FormContent, { FormContentProps } from '@src/Components/FormContent';

// import local modules : 지역(route)에서 사용중인 모듈을 선언하세요.
import { values } from '../../configs';
import { useData, useSelectedId } from '../../Provider';
import { useFileId, useForm, useOnFinish, useSetFileId } from '../Provider';
import { Provider, useApiUrl, useFiles, useGetIdfromRepond, useSetFiles } from './Provider';

function ModalForm() {
  const form = useForm();
  const onFinish = useOnFinish();

  const data = useData();
  const selectedId = useSelectedId();
  const files = useFiles();
  const setFiles = useSetFiles();
  const fileId = useFileId();
  const setFileId = useSetFileId();
  const apiUrl = useApiUrl();
  const getIdfromRepond = useGetIdfromRepond();
  const tagList = useTagList();

  const selectedData = useMemo(() => {
    if (selectedId) {
      const selected = data.find(obj => obj.id === selectedId);
      return {
        ...selected,
        startEndDateTime: [
          dayjs(service.getValue(selected, 'startDateTime')),
          dayjs(service.getValue(selected, 'endDateTime')),
        ],
      };
    }

    return null;
  }, [selectedId]);

  const addOn = useCallback((item) => {
    const key = service.getValue(item, 'key', '');

    if (item.type === 'image') {
      const formItemProps: FormItemProps = {
        label: service.getValue(item, 'label', ''),
        required: service.getValue(item, 'required', false),
        name: key,
        rules: service.getValue(item, 'rules', []),
      };

      const filePondProps: FilePondProps = {
        files,
        onupdatefiles: setFiles,
        allowMultiple: false,
        name: 'file',
        fileRenameFunction(file) {
          return `event_name${file.extension}`;
        },
        server: {
          url: apiUrl,
          process: {
            url: '/images',
            method: 'POST',
            onload(res) {
              getIdfromRepond(res);
              return res;
            },
          },
          revert: {
            url: `/images/${fileId}`,
            method: 'DELETE',
            onload(res) {
              setFileId(null);
              return res;
            },
          },
        },
        labelIdle: 'Drag & Drop your files',
      };

      return (
        <Form.Item name={key} {...formItemProps}>
          <StyledFilePond {...filePondProps} />
        </Form.Item>
      );
    }

    if (item.type === 'tags') {
      const formItemProps: FormItemProps = {
        label: service.getValue(item, 'label', ''),
        required: service.getValue(item, 'required', false),
        name: key,
        rules: service.getValue(item, 'rules', []),
        initialValue: service.getValue(selectedData, key, []),
      };

      return (
        <Form.Item name={key} {...formItemProps}>
          <Select mode="tags">
            {tagList.map((tag) => <Select.Option key={Math.random()} value={tag}>{tag}</Select.Option>)}
          </Select>
        </Form.Item>
      );
    }

    return null;
  }, [files, fileId, selectedData, tagList]);

  const formProps: FormProps = {
    form,
    layout: 'vertical',
    autoComplete: 'off',
    onFinish,
  };

  const formContentProps: FormContentProps = {
    formItems: service.getValue(values, 'formItems', []),
    initialValues: selectedData,
    addOn,
  };

  return (
    <Form {...formProps}>
      <FormContent {...formContentProps} />
    </Form>
  );
}

export default nest(Provider, ModalForm);

// 함수로 작성한 styled component를 선언하세요.
const StyledFilePond = styled(FilePond)(({ theme }) => ({
  ".filepond--credits": {
    display: "none",
  },
}));