import { useContext, useEffect, useMemo, useState } from "react";
import constate from "constate";
import { useQuery } from "@apollo/client";
import { ThemeContext } from "styled-components";

import { service } from "@src/configs"

import TagListQuery from '@src/graphql/queries/Project/getTagList';

function useResponseLayout() {
  const theme = useContext(ThemeContext);

  const [isMobile, setIsMobile] = useState<boolean>(true);

  useEffect(() => {
    const init = () => {
      const mobileSize = service.getValue(theme, "mobileMedia", "992px").replace("px", " ");
      if (Number.parseInt(mobileSize) > window.innerWidth) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    init();
    window.addEventListener("resize", init);
    return () => window.removeEventListener("resize", init);
  }, []);

  const { data: tagData } = useQuery(TagListQuery);
  const tagList = useMemo(() => service.getValue(tagData, 'tags', []).map(tag => service.getValue(tag, 'name', '')), [tagData]);

  return { isMobile, tagList };
}

const [Provider, useResponse, useTagList] = constate(
  useResponseLayout,
  (value) => value.isMobile,
  (value) => value.tagList,
);

export { Provider, useResponse, useTagList };
