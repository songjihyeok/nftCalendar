// import dependency modules : package.json에 명시된 외부모듈을 선언하세요.
import { Row, Col, Button, Form, Input, Select, Divider, Modal } from "antd";
import styled from "styled-components";
import { useState } from "react";
import { FilePond } from "react-filepond";
import { useRouter } from "next/router";
import { service } from "@src/configs"

import { useSetCurrent, useFormValues, useSetFormValues } from "../Provider";
import values from "./configs";

const { Option } = Select;

export default function SecondStep() {
  const [form] = Form.useForm()
  const eventInputs = values.values.detail;
  const [files, setFiles] = useState([]);
  const [open, setOpen] = useState(false)
  const setCurrent = useSetCurrent()
  const [fileId, setFileId] = useState<string | null>(null);
  const [unit, setUnit] = useState("ETH")
  const IMAGE_API_URL = process.env.NEXT_PUBLIC_API_URL
  const formValues = useFormValues()
  const setFormValues = useSetFormValues()

  const goNext = async () => {
    const result = await form.validateFields()
    if (!fileId) {
      Modal.error({ content: "upload event image" })
      return
    }
    if (result) {
      setFormValues({
        ...formValues, ...result,
        tags: [...result.tags],
        coverImage: fileId || "1",
        numberOfMinting: Number(result.numberOfMinting),
        mintingPrice: Number(result.mintingPrice)
      })
      setCurrent(2)
    }
  };

  const goBefore = () => {
    setCurrent(0)
  };

  const getIdfromRepond = (res) => {
    const result = JSON.parse(res)
    setFileId(result.key)
  }

  const unitMap = {
    "ETHEREUM": "ETH",
    "POLYGON": "MATIC",
    "SOLANA": "SOL",
    "BSC": "BNB",
    "FLOW": "FLOW",
    "WAX": "WAXP",
    "CARDANO": "ADA",
    "AVALANCHE": "AVAX",
    "HARMONY": "ONE",
    "ELROND": "EGLD",
    "IMMUTABLE X": "IMX"
  }


  const onChangeBlockChain = (key, value) => {
    const unit = unitMap[service.getValue(value, "children", "ETH")]
    setUnit(unit)
  }

  return (
    <StepRow>
      <Col span={24}>
        <Form layout="vertical" autoComplete='off'>
          <Form.Item label={eventInputs.imageUpload.label} name="coverImage" rules={eventInputs.imageUpload.rules}>
            <StyledFilePond
              files={files}
              onupdatefiles={setFiles}
              allowMultiple={false}
              name="file"
              fileRenameFunction={(file) => {
                return `event_name${file.extension}`;
              }}
              server={{
                url: IMAGE_API_URL,
                process: {
                  url: '/images',
                  method: 'POST',

                  onload: (res) => {
                    getIdfromRepond(res)
                    return res
                  }
                },
                revert: {
                  url: `/images/${fileId}`,
                  method: 'DELETE',
                  onload: (res) => {
                    setFileId(null)
                    return res
                  }
                }
              }}
              labelIdle="Drag & Drop your files"

            ></StyledFilePond>
          </Form.Item>
        </Form >
        <Form layout="vertical" autoComplete='off' form={form}>
          <Form.Item
            name={eventInputs.blockChain.name}
            label={eventInputs.blockChain.label}
            rules={eventInputs.blockChain.rules}
          >
            <Select placeholder={eventInputs.blockChain.placeholder} onChange={onChangeBlockChain}>
              {eventInputs.blockChain.options.map((option, index) => {
                return <Option key={index} value={option.value}>{option.title}</Option>;
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name={eventInputs.marketPlace.name}
            label={eventInputs.marketPlace.label}
            rules={eventInputs.marketPlace.rules}
          >
            <Select placeholder={eventInputs.marketPlace.placeholder}>
              {eventInputs.marketPlace.options.map((option, index) => {
                return <Option key={index} value={option.value}>{option.title}</Option>;
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name={eventInputs.price.name}
            label={eventInputs.price.label}
            rules={eventInputs.price.rules}
          >
            <Input suffix={unit} type={"number"} placeholder={eventInputs.price.placeholder}></Input>
          </Form.Item>
          <Form.Item
            name={eventInputs.amount.name}
            label={eventInputs.amount.label}
            rules={eventInputs.amount.rules}
          >
            <Input placeholder={eventInputs.amount.placeholder} type={"number"} ></Input>
          </Form.Item>
          <Form.Item
            name={eventInputs.category.name}
            label={eventInputs.category.label}
            rules={eventInputs.category.rules}
          >
            <Select
              placeholder={eventInputs.category.placeholder}

            >
              {eventInputs.category.options.map((option, index) => {
                return <Option key={index} value={option.value}>{option.title}</Option>;
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name={eventInputs.tags.name}
            label={eventInputs.tags.label}
            rules={eventInputs.tags.rules}
          >
            <Select
              placeholder={eventInputs.tags.placeholder}
              mode="tags"
            >
              {eventInputs.tags.options.map((option, index) => {
                return <Option key={index} value={option.value}>{option.title}</Option>;
              })}
            </Select>
          </Form.Item>
        </Form>
      </Col>
      <Divider></Divider>
      <SubmitWrapperCol span={24}>
        <Row gutter={[5, 0]}>
          <Col>
            <SubmitButton type="primary" onClick={goBefore}>
              before
            </SubmitButton>
          </Col>
          <Col>
            <SubmitButton type="primary" onClick={goNext}>
              next
            </SubmitButton>
          </Col>
        </Row>
      </SubmitWrapperCol>
    </StepRow>
  );
}

// 함수로 작성한 styled component를 선언하세요.

const StyledFilePond = styled(FilePond)(({ theme }) => {
  return {
    ".filepond--credits": {
      display: "none"
    }
  }
})


const SubmitWrapperCol = styled(Col)(({ theme }) => {
  return {
    display: "flex",
    justifyContent: "flex-end",
  };
});

const SubmitButton = styled(Button)(({ theme }) => {
  return {
    borderRadius: 8,
    width: 100,
  };
});

const StepRow = styled(Row)(({ theme }) => {
  return {
    maxWidth: 450,
    margin: "0 auto",
    paddingTop: 50,
    paddingBottom: 50,
    [`@media (max-width: ${theme.mobileMedia})`]: {
      paddingTop: 30,
      paddingBottom: 30,
    },
  };
});
