// import dependency modules : package.json에 명시된 외부모듈을 선언하세요.
import { Row, Col, Typography } from 'antd';
import styled from 'styled-components';
import Footer from "../../Components/Footer"

const { Title, Paragraph } = Typography


export default function About() {
  return (
    <>
      <AboutRow>
        <AboutCol span={24}>
          <MainTitle>About</MainTitle>
          <Paragraph>
            this is about
        </Paragraph>
        </AboutCol>

      </AboutRow>
      <Footer></Footer>
    </>
  );
}

// 함수로 작성한 styled component를 선언하세요.
const AboutRow = styled(Row)(({ theme }) => {
  return {
    height: "calc(100vh - 69px)"
  };
});

const MainTitle = styled(Title)(({ theme }) => {
  return {
    marginTop: 30
  }
})


const AboutCol = styled(Col)(({ theme }) => {
  return {
    maxWidth: 1250,
    margin: "0 auto",
  }
})
