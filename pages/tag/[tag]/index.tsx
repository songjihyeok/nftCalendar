// import dependency modules : package.json에 명시된 외부모듈을 선언하세요.
import { Row, Col, Typography } from 'antd';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Footer from "@src/Components/Footer";
import { useEffect } from "react"
import { useResponse } from "@src/Components/Common/Provider/isMobile";

import FilteredList from '@src/Components/SearchSection/FilteredList';
import { Provider, useData, useLoading, useFilter, useSetFilter, useHasNextPage } from '@src/Components/Tags/Provider';
import { nest } from "@src/configs"
import Advertise from "@src/Components/Advertise"


const { Title } = Typography;


function TagPage() {

  const isMobile = useResponse();
  const data = useData()
  const loading = useLoading()
  const filter = useFilter()
  const setFilter = useSetFilter()
  const hasNextPage = useHasNextPage()
  const { query: { tag } } = useRouter();
  const filterListProps = {
    data,
    loading,
    filter,
    setFilter,
    hasNextPage
  }

  useEffect(() => {
    setFilter({ ...filter, tagList: [tag] })
  }, [])



  return (
    <>
      <Row >
        <SearchPageCol span={24}>
          <MainTitle level={1}>"{tag}" search Result</MainTitle>
          <StyledSearchPageRow gutter={[30, 0]} >
            <Col span={24} lg={18}>
              <FilteredList filterListProps={filterListProps}></FilteredList>
            </Col>
            {!isMobile ?
              <Col span={6}>
                <Advertise></Advertise>
              </Col> : null
            }
          </StyledSearchPageRow>
        </SearchPageCol>
      </Row>
      <Footer></Footer>
    </>
  );
}

const StyledSearchPageRow = styled(Row)(({ theme }) => {
  return {
    minHeight: 900,

    [`@media (max-width: ${theme.mobileMedia})`]: {
      minHeight: 500
    }
  }
})





const SearchPageCol = styled(Col)(({ theme }) => {
  return {
    maxWidth: 1250,
    margin: "0 auto",
    paddingBottom: 50,
    [`@media (max-width: ${theme.mobileMedia})`]: {
      maxWidth: "92%",
    },
  }
})


// 함수로 작성한 styled component를 선언하세요.
const MainTitle = styled(Title)(({ theme }) => {
  return {
    ["&&"]: {
      textAlign: "center",
      color: theme.mainTextColor,
      marginTop: 23,
      marginBottom: 23,
    },
  };
});


export default nest(Provider, TagPage)