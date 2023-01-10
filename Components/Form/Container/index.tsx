// import dependency modules : package.json에 명시된 외부모듈을 선언하세요.
import { Row, Col, Card, Steps, Form, Tabs, Spin } from "antd";
import styled from "styled-components";
import React, { useEffect, useState } from "react"
import { useResponse } from "@src/Components/Common/Provider/isMobile";
import { Provider, useCurrent, useSetCurrent } from "../Provider";
import { values } from "../configs";
import { useRouter } from 'next/router'
import { service } from "@src/configs"
import { nest } from "@src/configs"
const { Step } = Steps;

// import global modules : 서비스 전역에서 사용중인 모듈을 선언하세요.

// import local modules : 지역(route)에서 사용중인 모듈을 선언하세요.

function Container() {
  const current = useCurrent();
  const setCurrent = useSetCurrent()
  const isMobile = useResponse();
  const router = useRouter()
  const [formValues, setFormValues] = useState({})


  const stepsValueObject = {
    "first": 0,
    "second": 1,
    "third": 2,
    "final": 3,
    "result": 4
  }

  // useEffect(() => {
  //   const currentStep = service.getValue(stepsValueObject, `${step}`, "first")
  //   setCurrent(currentStep)
  // }, [step])

  return (
    <ContainerWrapper>
      <ContainerRow current={current}>
        <Col span={24}>
          <StyledCard
            title="Submit Your Event"
            current={current}
            bodyStyle={{ height: current === 4 ? "100%" : "inherit", display: current === 4 ? "flex" : "inherit", alignItems: current === 4 ? "center" : null, justifyContent: current === 4 ? "center" : null }}
            headStyle={{ display: current === 3 || current === 4 ? "none" : "inherit" }}
            extra={
              <Steps current={current} style={{ minWidth: isMobile ? 0 : 300 }}>
                {current === 3 || current === 4 ? null :
                  <>
                    <Step title="Basic" />
                    <Step title="Detail" />
                    <Step title="Extra" />
                  </>}
              </Steps>
            }
          >
            <Form.Provider>
              <Tabs
                activeKey={current.toString()}
                renderTabBar={() => (
                  <span style={{ display: "none" }}>&nbsp;</span>
                )}
              >
                {values.steps.map((step) => {
                  const Component: React.ElementType = step.component;
                  return (
                    <Tabs.TabPane key={step.key}>
                      <Component formValues={formValues} setFormValues={setFormValues} />
                    </Tabs.TabPane>
                  );
                })}
              </Tabs>
            </Form.Provider>
          </StyledCard>
        </Col>
      </ContainerRow>
    </ContainerWrapper>
  );
}

// 함수로 작성한 styled component를 선언하세요.
const ContainerWrapper = styled.div(({ theme }) => {
  return {
    maxWidth: 1250,
    margin: "0 auto"
  }
})


const StyledCard = styled(Card)(({ theme, current }) => {
  return {
    height: current === 4 ? "100%" : "inherit",
    [`@media (max-width: ${theme.mobileMedia})`]: {
      [".ant-card-head-wrapper"]: {
        flexDirection: "column",
      },
      ".ant-steps-vertical": {
        flexDirection: "row",
      },
      ".ant-card-extra": {
        marginLeft: 0,
      },
    },
  };
});

const ContainerRow = styled(Row)(({ theme, current }) => {
  return {
    width: "100%",
    padding: "50px 10%",
    height: current === 4 ? "calc(100vh - 64px)" : "100%",
    [`@media (max-width: ${theme.mobileMedia})`]: {
      padding: "30px 4%",
    }
  };
});

export default Container