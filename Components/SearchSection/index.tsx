// import dependency modules : package.json에 명시된 외부모듈을 선언하세요.
import { Row, Col, Typography, Input, Select, Button, Tag } from "antd";
import styled from "styled-components";
import { useResponse } from "@src/Components/Common/Provider/isMobile";
import { nest } from "@src/configs"
import FilteredList from "./FilteredList";
import Filters from "./Filters"
import Advertise from "../Advertise"
import { Provider, useData, useLoading, useFilter, useSetFilter, useHasNextPage, useFetchMore } from "./Provider"


const { Title } = Typography;

function SearchSection() {

  const isMobile = useResponse();
  const data = useData()
  const loading = useLoading()
  const filter = useFilter()
  const setFilter = useSetFilter()
  const hasNextPage = useHasNextPage()
  const fetchMore = useFetchMore()

  const filterListProps = {
    data,
    loading,
    filter,
    setFilter,
    hasNextPage,
    fetchMore
  }


  return (
    <SearchSectionRow>
      <Col span={24}>
        <MainTitle>NFT Calender</MainTitle>
        <SubTitle level={5}>CURRENTLY MINTING & UPCOMING NFP DROPS</SubTitle>
      </Col>
      <Col span={24}>
        <Row gutter={[30, 0]}>
          <Col span={24} lg={18} >
            <Filters></Filters>
            <div style={{ marginTop: 40 }}>
              <FilteredList filterListProps={filterListProps}></FilteredList>
            </div>

          </Col>
          {!isMobile ?
            <Col span={6}>
              <Advertise></Advertise>
            </Col> : null
          }
        </Row>
      </Col>

    </SearchSectionRow>
  );
}


const SearchSectionRow = styled(Row)(({ theme }) => {
  return {
    paddingTop: 121,
    paddingBottom: 96,
    margin: "0 auto",
    [`@media (max-width: ${theme.mobileMedia})`]: {
      paddingLeft: 0,
      paddingTop: 50,
      paddingBottom: 0,
      paddingRight: 0,
    },
  };
});

const MainTitle = styled(Title)(({ theme }) => {
  return {
    ["&&"]: {
      textAlign: "center",
      color: theme.mainTextColor,
      marginBottom: 23,
      [`@media (max-width: ${theme.mobileMedia})`]: {
        fontSize: 30,
      },
    },
  };
});

const SubTitle = styled(Title)(({ theme }) => {
  return {
    ["&&"]: {
      color: theme.subTextColor,
      textAlign: "center",
      marginBottom: 80,
      [`@media (max-width: ${theme.mobileMedia})`]: {
        fontSize: 15,
        marginBottom: 50,
      },
    },
  };
});

export default nest(Provider, SearchSection)