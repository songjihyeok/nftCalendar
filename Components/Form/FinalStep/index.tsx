// import dependency modules : package.json에 명시된 외부모듈을 선언하세요.
import { Row, Col, Card, Typography, Button, Modal } from "antd";
import styled from "styled-components";
import { CheckOutlined, WarningOutlined } from "@ant-design/icons";
import Image from "next/image";
import Footer from "@src/Components/Footer";
import { ethers } from "ethers"
import { values } from "./configs";
import dayjs from 'dayjs';
import Web3 from "web3"
import { service } from "@src/configs"
import { useResponse } from "@src/Components/Common/Provider/isMobile";
import { useFormValues, useSetCurrent, useSetFormValues } from "../Provider"
import { useMutation } from "@apollo/client"
import metamask from "/assets/common/icons/metamask.png"
import { createQuery } from "@src/graphql/mutation/create"
import { urlChange } from "@src/Components/Common/utils/urlChange"
const destinationAddress = "0x250b9D14dC67D178b2bA4729C3574C5E5696D33d"

const { Title, Text } = Typography;
export default function FinalStep() {

  const [createProject] = useMutation(createQuery)
  const isMobile = useResponse();
  const setCurrent = useSetCurrent()
  const formValues = useFormValues()
  const setFormValues = useSetFormValues()

  const eventName = service.getValue(formValues, "title", "event name")

  const doPayment = async (ethereumProvider) => {
    const hash = formValues.transactionHash

    if (hash) {
      return hash
    }

    if (!hash) {
      const web3 = new Web3(ethereumProvider)
      const mainNetId = await web3.eth.net.getId()
      if (mainNetId !== 1) {
        Modal.error({ content: "Please use the Ethereum main network" })
        return
      }

      await ethereumProvider.send("eth_requestAccounts")
      const provider = new ethers.providers.Web3Provider(ethereumProvider)
      const signer = provider.getSigner()

      // ethers.utils.
      ethers.utils.getAddress(destinationAddress)
      const tx = await signer.sendTransaction({
        to: destinationAddress,
        value: ethers.utils.parseEther("0.0001"),
      })
      if (tx.hash) {
        setFormValues({ ...formValues, transactionHash: tx.hash })
        Modal.success({ content: "payment has been successed" })
        return tx.hash
      } else {
        return null
      }
    }
  }

  const doCreateProject = async (transactionHash) => {
    try {
      const createVariable = {
        ...formValues,
        transactionHash: transactionHash,
        // isPromoted: true,
        isVisible: true,
      }
      const result = await createProject({ variables: { CreateProjectInput: createVariable } })

      return result
    }
    catch (error) {
      Modal.confirm({
        content: "Looks like there is something wrong in your form. Do you want to go back to your form? You dont have to pay again", onOk: () => {
          setCurrent(2)
        }
      })
    }
  }



  const onPaymentMetamask = async () => {
    try {
      const ethereumProvider = service.getValue(window, "ethereum", null)

      if (!ethereumProvider) {
        Modal.confirm({
          centered: true,
          title: "Please install metamask app",
          async onOk() {
            window.open("https://metamask.io/download/")
          }
        })
      } else {
        const transactionHash = await doPayment(ethereumProvider)

        if (transactionHash) {
          const createProjectResult = await doCreateProject(transactionHash)

          if (createProjectResult) {
            // setFormValues(null)
            setCurrent(4)
          }
        } else {
          Modal.error({ content: "payment has been failed" })
        }
      }
    }
    catch (error) {
      if (error.code === "INSUFFICIENT_FUNDS") {
        Modal.error({ content: error.code })
        return
      } else {
        Modal.error({ content: error.message })
      }
    }
  }

  const onContinue = () => {
    Modal.confirm({
      centered: true,
      title: "Are you sure to list your event in free way?",
      async onOk() {
        try {
          const createVariable = {
            ...formValues,
            transactionHash: "",
            isVisible: false,
          }
          const result = await createProject({ variables: { CreateProjectInput: createVariable } })
          if (result) {
            // setFormValues(null)
            setCurrent(4)
          }
        }
        catch (error) {
          Modal.confirm({
            content: "Looks like there is something wrong in your form. Do you want to go back to your form ?", onOk: () => {
              setCurrent(2)
            }
          })
        }
      },
    });
  }


  return (
    <>
      <CardWrapperRow>
        <StyledCol span={24}>
          <MainTitleText>
            {values.values.mainTitle + " "}
            <Bold>{eventName}</Bold>
          </MainTitleText>
          <DescriptionText>
            {values.values.description.fourth + " "}
            <ColorText>
              <Bold>{values.values.description.BoldedFourth}</Bold>{" "}
            </ColorText>
            {values.values.description.fifth}
          </DescriptionText>
        </StyledCol>
        <BottomCardWrapperCol span={24}>
          <CardRow gutter={[15, isMobile ? 20 : 0]}>
            <Col span={24} lg={12}>
              <FirstTypeCards
                bodyStyle={{
                  height: "100%",
                  padding: isMobile ? 33 : "53px 33px 33px 33px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <TopCardPart>
                  <Tag>
                    <TagTitle>EXPRESS</TagTitle>
                  </Tag>
                  <CostWrapper>
                    <CostTitle>0.05</CostTitle> <Unit>ETH</Unit>
                  </CostWrapper>
                  <MainTextWrapper>
                    <MainText>
                      Save Time and start getting exposure immediately
                    </MainText>
                  </MainTextWrapper>

                  <Row>
                    <CheckTextWrapperCol span={24}>
                      <StyledCheckOutlined />
                      <MainText>Guaranteed publication</MainText>
                    </CheckTextWrapperCol>
                    <CheckTextWrapperCol span={24}>
                      <StyledCheckOutlined />
                      <MainText>
                        {`Priority moderation queue \n(under 12hours)`}
                      </MainText>{" "}
                    </CheckTextWrapperCol>
                    <CheckTextWrapperCol span={24}>
                      <StyledCheckOutlined />
                      <MainText>VIP support from NFT Calender Team</MainText>
                    </CheckTextWrapperCol>
                    <CheckTextWrapperCol span={24}>
                      <StyledCheckOutlined />
                      <MainText>{`Efferties listing verification\n (no development work required)`}</MainText>
                    </CheckTextWrapperCol>
                  </Row>
                </TopCardPart>

                <BottomCardPart borderColor={"#fe8103"}>
                  <MeTaMaskButton onClick={onPaymentMetamask}>
                    {" "}
                    <MetaMaskImageWrapper>
                      <MetaMaskImage
                        width={30}
                        height={30}
                        layout={"fixed"}
                        src={metamask}
                      ></MetaMaskImage>
                    </MetaMaskImageWrapper>
                    PAY WITH METAMASK
                  </MeTaMaskButton >
                </BottomCardPart>
              </FirstTypeCards>
            </Col>
            <Col span={24} lg={12}>
              <SecondTypeCards
                bodyStyle={{
                  height: "100%",
                  padding: isMobile ? 33 : "53px 33px 33px 33px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <TopCardPart>
                  <Tag color="#3985d3">
                    <TagTitle>STANDARD</TagTitle>
                  </Tag>
                  <CostWrapper>
                    <CostTitle color="#3985d3">FREE</CostTitle>
                  </CostWrapper>
                  <MainTextWrapper>
                    <MainText>
                      Listing on Calendar will always be free
                    </MainText>
                  </MainTextWrapper>

                  <Row>
                    <CheckTextWrapperCol span={24}>
                      <StyledCheckOutlined />
                      <MainText>
                        Standard moderation queue(review in 4~5days)
                      </MainText>
                    </CheckTextWrapperCol>
                    <CheckTextWrapperCol span={24}>
                      <StyledCheckOutlined />
                      <MainText>
                        {`Eligible for manual list long verification \n(requires development work)`}
                      </MainText>
                    </CheckTextWrapperCol>
                    <CheckTextWrapperCol span={24}>
                      <StyledCheckOutlined />
                      <MainText>Standard support queue</MainText>
                    </CheckTextWrapperCol>
                    <CheckTextWrapperCol span={24}>
                      <StyledWarningOutlined />
                      <MainText>{`Only 1 out of 10 projects pass through moderation due to high demand`}</MainText>
                    </CheckTextWrapperCol>
                  </Row>
                </TopCardPart>
                <BottomCardPart>
                  <ContinueButton onClick={onContinue}> Continue</ContinueButton>
                </BottomCardPart>
              </SecondTypeCards>
            </Col>
          </CardRow>
        </BottomCardWrapperCol>
      </CardWrapperRow>
    </>
  );
}

export async function getStaticProps() {


}



const TopCardPart = styled.div(({ theme }) => {
  return {
    height: "100%",
  };
});

const BottomCardPart = styled.div(({ theme, borderColor }) => {
  return {
    "&& .ant-btn:hover": {
      borderColor: borderColor ?? null,
    },
    "&& .ant-btn:focus": {
      borderColor: borderColor ?? null,
    },
  };
});

const MetaMaskImageWrapper = styled.div(({ theme }) => {
  return {
    marginRight: 15,
    display: "flex",
    alignItems: "center",
    height: "100%",
  };
});

const MetaMaskImage = styled(Image)(({ theme }) => {
  return {
    borderRadius: 30,
    marginRight: 15,
  };
});

const MeTaMaskButton = styled(Button)(({ theme }) => {
  return {
    ["&&"]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#fe8103",
      color: "white",
      width: "100%",
      borderRadius: 15,
      height: 43,
      fontSize: 15,
    },
  };
});

const ContinueButton = styled(Button)(({ theme }) => {
  return {
    background: "#d9d9d9",
    color: "#777777",
    width: "100%",
    borderRadius: 15,
    height: 43,
  };
});

const MainTextWrapper = styled.div(({ theme }) => {
  return {
    marginTop: 21,
    marginBottom: 31,
    [`@media (max-width: ${theme.mobileMedia})`]: {
      marginTop: 15,
      marginBottom: 20,
    },
  };
});

const StyledWarningOutlined = styled(WarningOutlined)(({ theme }) => {
  return {
    color: "#d3b139",
    marginRight: 10,
    alignSelf: "flex-start",
    marginTop: 5,
  };
});

const StyledCheckOutlined = styled(CheckOutlined)(({ theme }) => {
  return {
    color: "#3985d3",
    marginRight: 10,
    alignSelf: "flex-start",
    marginTop: 5,
  };
});

const CheckTextWrapperCol = styled(Col)(({ theme }) => {
  return {
    display: "flex",
    alignItems: "center",
    marginBottom: 22,
  };
});

const MainText = styled(Text)(({ theme }) => {
  return {
    display: "block",
    color: "#777777",
    whiteSpace: "pre-line",
  };
});

const Unit = styled.span(({ theme }) => {
  return {
    marginBottom: 5,
    marginLeft: 5,
    color: "#999999",
  };
});

const CostWrapper = styled.div(({ theme }) => {
  return {
    display: "flex",
    alignItems: "flex-end",
    marginTop: 10,
  };
});

const CostTitle = styled(Title)(({ theme, color }) => {
  return {
    ["&&"]: {
      color: color ?? "#123b77",
      marginBottom: 0,
      fontSize: 51,
      fontWeight: 800,
    },
  };
});

const TagTitle = styled(Title)(({ theme }) => {
  return {
    ["&&"]: {
      color: "white",
      fontSize: 12,
      marginBottom: 0,
    },
  };
});

const BottomCardWrapperCol = styled(Col)(({ theme }) => {
  return {
    justifyContent: "center",
    display: "flex",
    marginTop: 51,
    [`@media (max-width: ${theme.mobileMedia})`]: {
      marginTop: 0,
    },
  };
});

const CardWrapperRow = styled(Row)(({ theme }) => {
  return {
    // justifyContent: "center",
    paddingTop: 30,
    paddingBottom: 30,
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

const MainTitleText = styled(Text)(({ theme }) => {
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

const StyledCard = styled(Card)(({ theme }) => {
  return {
    // height: "100%",
    margin: "80px auto",
    maxWidth: 1250,
    // paddingTop: 137,
    // paddingBottom: 171,
    [`@media (max-width: ${theme.mobileMedia})`]: {
      margin: "30px auto",
      paddingTop: 0,
      paddingBottom: 0,
      "> .ant-card-body": {
        background: "#e8eef6",
        padding: 0,
      },
    },
  };
});

const StyledCol = styled(Col)(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
});


  // const mocked = {
//   blockChain: "Binance Smart Chain",
// category: ['defi', 'art', 'sports'],
// checked: true,
// description: "sddsd",
// discord: "ddd",
// email: "sdsd",
// end: Moment {_isAMomentObject: true, _isUTC: false, _pf: {…}, _locale: Locale, _d: Thu May 26 2022 12:11:48 GMT+0900 (한국 표준시), …}
// fileId: "1651893116422",
// image: undefined,
// marketPlace: "magiceden",
// marketplace: "dd",
// source: undefined,
// start: Moment {_isAMomentObject: true, _isUTC: false, _pf: {…}, _locale: Locale, _d: Wed May 11 2022 12:11:47 GMT+0900 (한국 표준시), …}
// term: undefined
// title: "ddd"
// twitter: "dd"
// website: "sds"
// [[Prototype]]: 
// // }
// const createVariable = {
//   announcementUrl: ,
//   blockchainId: ,
//   coverImage: ,
//   description: ,
//   discordUrl: ,
//   email: ,
//   endDateTime: ,
//   isPromoted:,
//   isVerified:,
//   marketplaceId:,
//   marketplaceUrl:,
//   startDateTime:,
//   tags:,
//   title:,
//   twitterUrl:,
//   websiteUrl:,
// }

