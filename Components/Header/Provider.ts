import { useState, useCallback } from "react";
import constate from "constate";

// state의 type을 지정해주세요.
type CounterProps = number;

function useHeader() {
  // counter 예제입니다.
  const [hamburgerVisible, setHamburgerVisible] = useState<boolean>(false);
  return {
    hamburgerVisible,
    setHamburgerVisible,
  };
}

const [Provider, useHamburgerVisible, useSetHamburgerVisible] = constate(
  useHeader,
  (value) => value.hamburgerVisible, // 현재 count 값 읽기
  (value) => value.setHamburgerVisible // count 값 증가
);
export { Provider, useHamburgerVisible, useSetHamburgerVisible };
