import { useState, useCallback, useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';

import constate from 'constate';
import { useData, useSetSelectedId } from '../Provider';

// state의 type을 지정해주세요.

function useDetail() {
  const { query: { id } } = useRouter();
  const data = useData();
  const setSelectedId = useSetSelectedId();

  const selectedData = useMemo(() => data.find(obj => obj.id === +id), [data]);

  useEffect(() => {
    setSelectedId(+id);
    return () => {
      setSelectedId(null);
    };
  }, [id]);

  return { selectedData };
}

const [Provider, useSelectedData] = constate(
  useDetail,
  (value) => value.selectedData,
);

export { Provider, useSelectedData };
