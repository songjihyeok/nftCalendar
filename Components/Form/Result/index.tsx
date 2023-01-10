// import dependency modules : package.json에 명시된 외부모듈을 선언하세요.
import { Row, Col, Card, Typography, Button, Modal } from "antd";
import styled from 'styled-components';

import { service } from "@src/configs"
import { values } from "@src/Components/Form/Result/configs"
import { useResponse } from "@src/Components/Common/Provider/isMobile";
import { useFormValues, useSetFormValues } from "../Provider"
import { useRouter } from "next/router";

const { Title, Text } = Typography;

export default function Result() {
  const formValues = useFormValues()
  const setFormValues = useSetFormValues()
  const router = useRouter();

  const email = service.getValue(formValues, "email", "example@email.com")

  const onGoHome = () => {
    setFormValues(null)
    router.push("/")
  }


  return (
    <>
      <CardWrapperRow>
        <StyledCol span={24}>
          <MainTitleText>
            {values.values.mainTitle + " "}
          </MainTitleText>
          <DescriptionText>{values.values.description.first}</DescriptionText>
          <DescriptionText>
            {values.values.description.second + " "}
            <ColorText>
              <Bold>{email}</Bold>
            </ColorText>
            {" " + values.values.description.third}
          </DescriptionText>
          <GoHomeButton onClick={onGoHome}>Back to home</GoHomeButton>
        </StyledCol>
      </CardWrapperRow>
    </>
  );
}

// 함수로 작성한 styled component를 선언하세요.

const GoHomeButton = styled(Button)(({ theme }) => {
  return {
    marginTop: 30
  }
})


const CardWrapperRow = styled(Row)(({ theme }) => {
  return {
    // justifyContent: "center",
    paddingTop: 30,
    paddingBottom: 30,
    height: "100%",
    [`@media (max-width: ${theme.mobileMedia})`]: {
      paddingTop: 0,
      paddingBottom: 0,
    },
  };
});

const ColorText = styled(Text)(({ theme }) => {
  return {
    color: theme.buttonColor,
  };
});

const MainTitleText = styled(Title)(({ theme }) => {
  return {
    ["&&"]: {
      fontSize: 30,
      marginBottom: 24,
      color: theme.buttonColor,
      [`@media (max-width: ${theme.mobileMedia})`]: {
        fontSize: 25,
        marginBottom: 15,
      },
    },
  };
});

const DescriptionText = styled(Text)(({ theme }) => {
  return {
    marginTop: 10,
    fontSize: 20,
    color: theme.greyTheme,
    [`@media (max-width: ${theme.mobileMedia})`]: {
      fontSize: 15,
    },
  };
});

const Tag = styled.div(({ theme, color }) => {
  return {
    borderRadius: 12,
    background: color ?? "#123b77",
    width: 85,
    height: 24,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
});

const CardRow = styled(Row)(({ theme }) => {
  return {
    ["&&"]: {
      width: 850,
      margin: "0 auto",
      padding: "30px 0",
    },
  };
});

const FirstTypeCards = styled(Card)(({ theme }) => {
  return {
    ["&&"]: {
      background: "white",
      height: 600,
      borderRadius: 16,
      [`@media (max-width: ${theme.mobileMedia})`]: {
        height: 550,
      },
    },
  };
});
const SecondTypeCards = styled(Card)(({ theme }) => {
  return {
    ["&&"]: {
      background: "#efefef",
      height: 600,
      borderRadius: 16,
      [`@media (max-width: ${theme.mobileMedia})`]: {
        height: 550,
        marginBottom: 0
      },
    },
  };
});

const Bold = styled.span(({ theme }) => {
  return {
    fontWeight: "bold",
  };
});



const StyledCol = styled(Col)(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
});

