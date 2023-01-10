// import dependency modules : package.json에 명시된 외부모듈을 선언하세요.
import { Row, Col, Input, Select, Button, Tag } from 'antd';
import { useState } from "react"
import { useResponse } from "@src/Components/Common/Provider/isMobile";
import styled from 'styled-components';
import Image from "next/image";
import Reset from "/assets/common/filter/reset.png"
// const Filter = "/assets/common/icons/filter.png"
import { values } from "@src/configs"

import { useSetFilter, useFilter } from '../Provider';

enum ProjectListOf {
  NEWEST = "NEWEST",
  PAST = "PAST",
  PROMOTED = "PROMOTED",
  TODAY = "TODAY",
  UPCOMING = "UPCOMING",
  VERIFIED = "VERIFIED",
}

const { Search } = Input;
const { Option } = Select;
const { CheckableTag } = Tag;


export default function Filters() {
  const setFilter = useSetFilter()
  const filter = useFilter()
  const isMobile = useResponse();
  const [type, setType] = useState(ProjectListOf.NEWEST)

  const onSearch = (value) => {
    setFilter({ ...filter, keyword: value })
  };

  const onTypeChange = (value: ProjectListOf) => {

    if (value === ProjectListOf.PROMOTED || value === ProjectListOf.VERIFIED) {
      setFilter({ ...filter, [value]: true })
    } else {
      setFilter({ ...filter, of: value })
    }
    setType(value)
  };

  const onReset = () => {
    setType(ProjectListOf.NEWEST)
    setFilter({ keyword: null, blockChainIdList: [], first: 10, of: ProjectListOf.NEWEST, isVisible: true, isVerified: false, after: null, last: null, before: null })
  }


  const handleChange = (tag, checked) => {
    const blockChainList = filter.blockChainIdList
    const nextBlockChainList = checked
      ? [...blockChainList, tag.id]
      : blockChainList.filter((t) => t !== tag.id);
    setFilter({ ...filter, blockChainIdList: nextBlockChainList });
  };

  return (
    <Row>
      <Col span={24}>
        <SearchRow gutter={[15, isMobile ? 15 : 0]}>
          <Col span={24} lg={13}>
            <StyledSearch placeholder="input search text" onSearch={onSearch} />
          </Col>
          <Col span={12} lg={7}>
            <StyledSelect
              placeholder="Select Type"
              onChange={onTypeChange}
              value={type}
              allowClear
            >
              <Option value={ProjectListOf.NEWEST}>NEWEST</Option>
              <Option value={ProjectListOf.PAST}>PAST</Option>
              <Option value={ProjectListOf.TODAY}>TODAY</Option>
              <Option value={ProjectListOf.UPCOMING}>UPCOMING</Option>
              <Option value={ProjectListOf.PROMOTED}>PROMOTED</Option>
              <Option value={ProjectListOf.VERIFIED}>VERIFIED</Option>
            </StyledSelect>
          </Col>
          <Col span={12} lg={4}>
            <ResetButton onClick={onReset}>
              <Row gutter={[15, 0]}>
                <ResetImageCol>
                  <Image
                    width={25}
                    height={25}
                    src={Reset}
                  ></Image>
                </ResetImageCol>
                <ResetTitleCol> Reset All</ResetTitleCol>
              </Row>
            </ResetButton>

          </Col>
        </SearchRow>
        <TagsRow>
          <Col span={24} lg={20}>
            {values.tagsData.map((tag) => (
              <StyledCheckableTag
                key={tag.title}
                checked={filter.blockChainIdList.indexOf(tag.id) > -1}
                onChange={(checked) => handleChange(tag, checked)}
              >
                <Row gutter={[5, 0]}>
                  <TagBodyWrapperCol>
                    <StyledImage
                      width={20}
                      height={20}
                      src={tag.image}
                    ></StyledImage>
                  </TagBodyWrapperCol>
                  <Col>{tag.title}</Col>
                </Row>
              </StyledCheckableTag>
            ))}
          </Col>
        </TagsRow>
      </Col>
    </Row>
  );
}

// 함수로 작성한 styled component를 선언하세요.


const ResetImageCol = styled(Col)(({ theme }) => {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [`@media (max-width: ${theme.mobileMedia})`]: {
      marginRight: 10,
    },
  };
});

const ResetTitleCol = styled(Col)(({ theme }) => {
  return {
    marginLeft: 0,
    display: "flex",
    alignItems: "center",
    [`@media (max-width: ${theme.mobileMedia})`]: {
      fontSize: 18
    },
  };
});


const ResetButton = styled(Button)(({ theme }) => {
  return {
    ["&&"]: {
      background: "#123b77",
      height: "100%",
      width: "100%",
      borderRadius: 8,
      color: "white",
      display: "flex",
      alignItems: "center",
      [`@media (max-width: ${theme.mobileMedia})`]: {
        width: "100%",
        height: "100%",
        display: "flex",
        fontSize: 20,
        justifyContent: "center",
        alignItems: "center",
      },
    },
  };
});

const TagsRow = styled(Row)(({ theme }) => {
  return {
    marginTop: 20,
  };
});

const TagBodyWrapperCol = styled(Col)(({ theme }) => {
  return {
    "&&": {
      display: "flex",
      alignItems: "center",
    },
  };
});

const StyledImage = styled(Image)(({ theme }) => {
  return {
    marginRight: 5,

  };
});

const StyledCheckableTag = styled(CheckableTag)(({ theme }) => {
  return {
    "&&": {
      padding: "3px 10px",
      marginBottom: 10,
    },
    ["&&.ant-tag"]: {
      borderRadius: 14.5,
      border: "1px solid #bbb",
      color: "#bbb",
    },
    ["&&.ant-tag-checkable-checked"]: {
      backgroundColor: theme.subColor,
      borderRadius: 14.5,
      color: "white",
      border: `1px solid ${theme.subColor}`,
    },
    ["&&.ant-tag-checkable:not(.ant-tag-checkable-checked):hover"]: {
      color: theme.subColor,
      border: `1px solid ${theme.subColor}`,
    },
  };
});

const StyledSelect = styled(Select)(({ theme }) => {
  return {
    ".ant-input": {
      height: 51,
    },
    "&&": {
      ".ant-select-selector": {
        height: 51,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      width: "100%",
    },
  };
});

const StyledSearch = styled(Search)(({ theme }) => {
  return {
    ".ant-input": {
      height: 51,
    },
    "&&": {
      height: 51,
      width: "100%",

      ".ant-input-search-button": {
        height: 51,
        width: 51,
      },
    },
  };
});

const SearchRow = styled(Row)(({ theme }) => {
  return {
    ["&&"]: {
      height: 51,
      [`@media (max-width: ${theme.mobileMedia})`]: {
        height: "auto",
      },
    },
  };
});

const FilterImage = styled(Image)(({ theme }) => {
  return {
    ["&&"]: {
      marginRight: 5,
    },
  };
});

const FilterColTitle = styled(Col)(({ theme }) => {
  return {
    marginLeft: 5,
  };
});

const FilterButton = styled(Button)(({ theme }) => {
  return {
    background: "#3985d3",
    borderRadius: 8,
    height: "100%",
    color: "white",
    display: "flex",
    fontSize: 15,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  };
});


