import { useState, useCallback } from 'react';
import constate from 'constate';

// state의 type을 지정해주세요.
type CounterProps = number;

function useevents(props) {
  // counter 예제입니다.

  const { data } = props

  return { data };
}

const [Provider, useData] = constate(
  // 선언한 custom hook을 주입하세요.
  useevents,
  // custom hook에서 반환한 값을 selector로 지정하세요.
  // custom hook의 API로 사용될 수 있게 각각의 selector를 기술해주세요.
  (value) => value.data, // 현재 count 값 읽기

);

export { Provider, useData };
