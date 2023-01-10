import { useEffect, useState, useCallback, useMemo } from 'react';
import constate from 'constate';

import { useForm, useSetFileId } from '../Provider';

// state의 type을 지정해주세요.

function useModalForm() {
  const form = useForm();
  const setFileId = useSetFileId();
  const [files, setFiles] = useState<any[]>([]);

  const apiUrl = useMemo(() => process.env.NEXT_PUBLIC_API_URL, []);

  useEffect(() => {
    form.resetFields();
  }, []);

  const getIdfromRepond = useCallback((res) => {
    const result = JSON.parse(res)
    setFileId(result.key);
  }, []);

  return { files, setFiles, apiUrl, getIdfromRepond };
}

const [Provider, useFiles, useSetFiles, useApiUrl, useGetIdfromRepond] = constate(
  useModalForm,
  (value) => value.files,
  (value) => value.setFiles,
  (value) => value.apiUrl,
  (value) => value.getIdfromRepond,
);

export { Provider, useFiles, useSetFiles, useApiUrl, useGetIdfromRepond };
