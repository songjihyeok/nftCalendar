import { useState, useCallback } from 'react';
import constate from 'constate';
import { service } from "@src/configs"

// state의 type을 지정해주세요.

function useHome(props) {

  const gotData = service.getValue(props, "data", [])

  return { gotData };
}

const [Provider, useData] = constate(
  useHome,
  (value) => value.gotData,
  // (value) => value.loading
);

export { Provider, useData };
