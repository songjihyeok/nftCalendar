// import dependency modules : package.json에 명시된 외부모듈을 선언하세요.
import { Row, Col, Button, Form, Input, Checkbox, Modal, Divider, Typography } from "antd";
import { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useSetFormValues, useFormValues, useSetCurrent } from "../Provider";
import values from "./configs";
import { validate } from "graphql";
import { service } from "@src/configs";


const { Text } = Typography

interface Ivalidate {
  email: boolean
  websiteUrl: boolean
  announcementUrl: boolean
  marketplaceUrl: boolean
  twitterUrl: boolean
  discordUrl: boolean
  term: boolean
}

export default function ThirdStep(props) {
  const router = useRouter();
  const [visible, setVisible] = useState(false)
  const [warnVisible, setWarnVisible] = useState(false)
  const [form] = Form.useForm()
  const [checked, setChecked] = useState(false)
  const formValues = useFormValues()
  const setCurrent = useSetCurrent()
  const setFormValues = useSetFormValues()
  const email = values.values.email;
  const goBefore = () => {
    setCurrent(1)
  };

  const onSubmit = async () => {
    const formValidateResult = await form.validateFields()

    if (!checked) {
      setWarnVisible(true)
      return
    }

    const removedEmptyString = Object.keys(formValidateResult).reduce((result, current) => {
      const value = formValidateResult[current]
      if (value === "") {
        return { ...result, [current]: null }
      }
      return { ...result, [current]: value }
    }, {})


    // console.log("custom", customValidateResult)
    if (removedEmptyString) {
      setFormValues({ ...formValues, ...removedEmptyString })
      setVisible(true);
    }
  };

  const handleOk = async () => {
    setVisible(false);
    setCurrent(3)
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onTermCheck = (checked) => {

    setChecked(checked.target.checked)
    if (checked.target.checked) {
      setWarnVisible(false)
    }
  }

  return (
    <StepRow>
      <Col span={24}>
        <Form layout="vertical" form={form} autoComplete='off'>
          <Form.Item
            name={email.contact.name}
            label={email.contact.label}
            rules={email.contact.rules as any[]}
          >
            <Row>
              <Col span={24}>
                <Input placeholder={email.contact.placeholder}></Input>
              </Col>
              <Col span={24}>
              </Col>
            </Row>

          </Form.Item>

          <Form.Item
            name={email.website.name}
            label={email.website.label}
            rules={email.website.rules as any[]}
          >
            <Row>
              <Col span={24}>  <Input placeholder={email.website.placeholder}></Input></Col>
            </Row>
          </Form.Item>
          <Form.Item
            name={email.source.name}
            label={email.source.label}
            rules={email.source.rules as any[]}
          >
            <Input placeholder={email.source.placeholder}></Input>

          </Form.Item>
          <Form.Item
            name={email.url.name}
            label={email.url.label}
            rules={email.url.rules as any[]}
          >
            <Input placeholder={email.url.placeholder}></Input>
          </Form.Item>

          <Form.Item
            name={email.twitter.name}
            label={email.twitter.label}
            rules={email.twitter.rules as any[]}
          >
            <Input placeholder={email.twitter.placeholder}></Input>
          </Form.Item>
          <Form.Item
            name={email.discord.name}
            label={email.discord.label}
            rules={email.discord.rules as any[]}
          >
            <Input placeholder={email.discord.placeholder}></Input>

          </Form.Item>
          <Row>
            <Col span={24}><Checkbox onChange={onTermCheck}>{email.term.description}</Checkbox></Col>
            {warnVisible ? <Col span={24}> <RedText>Please agree with the terms of use</RedText> </Col> : null}
          </Row>
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
            <SubmitButton type="primary" onClick={onSubmit}>
              submit
            </SubmitButton>
          </Col>
        </Row>
      </SubmitWrapperCol>

      <Modal
        title="Are you sure to "
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure to list your event?</p>
      </Modal>
    </StepRow >
  );
}
const SubmitButton = styled(Button)(({ theme }) => {
  return {
    borderRadius: 8,
    width: 100,
  };
});

const SubmitWrapperCol = styled(Col)(({ theme }) => {
  return {
    display: "flex",
    justifyContent: "flex-end",
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

const RedText = styled(Text)(({ theme }) => {
  return {
    color: "red"
  }
})