// import dependency modules : package.json에 명시된 외부모듈을 선언하세요.
import {
  Row,
  Col,
  Button,
  Form,
  Input,
  Typography,
  Divider,
  DatePicker as AntDatePicker,
  Modal
} from "antd";
import styled from "styled-components";
import { urlChange } from "@src/Components/Common/utils/urlChange"
import { values } from "@src/Components/Form/FirstStep/configs";
import dayjs from 'dayjs';
import { service } from "@src/configs"
import { useSetCurrent, useFormValues, useSetFormValues } from "../Provider"


const { Title } = Typography;

export default function FirstStep(props) {
  const eventInputs = values.values.event;
  const eventDates = values.values.date;
  const setCurrent = useSetCurrent()
  const [form] = Form.useForm()
  const formValues = useFormValues()
  const setFormValues = useSetFormValues()

  const goNext = async () => {
    const result = await form.validateFields()

    console.log(result.description)
    console.log("???", encodeURIComponent(result.description))

    if (result) {
      if (dayjs(result.startDateTime).isAfter(dayjs(result.endDateTime)) || dayjs(result.endDateTime).isBefore(dayjs())) {
        Modal.error({ content: "The date is not valid" })
        return
      }

      const regExp = /^[a-zA-Z0-9!-*@#$%^&()+-~\s]+$/

      const regResult = regExp.test(result.title)
      if (!regResult) {
        Modal.error({ content: "The title is not valid" })
        return
      }

      const startDateTime = dayjs(result.startDateTime).format("YYYY/MM/DD")
      const endDateTime = dayjs(result.endDateTime).format("YYYY/MM/DD")
      setFormValues({
        ...formValues,
        ...result,
        description: encodeURIComponent(result.description),
        startDateTime,
        endDateTime
      })
      setCurrent(1)
    }
  };

  const onFocus = (e) => {
    e.target.blur()
  }

  return (
    <StepRow>
      <Col span={24}>
        <Form layout="vertical" form={form} autoComplete='off'>
          <Form.Item
            name={eventInputs.title.name}
            label={eventInputs.title.label}
            rules={eventInputs.title.rules}
          >
            <Row>
              <Col span={24}>
                <Input placeholder={"Event title"} />
              </Col>
            </Row>

          </Form.Item>
          <Form.Item
            name={eventInputs.description.name}
            label={eventInputs.description.label}
            rules={eventInputs.description.rules}
          >
            <StyledTextArea placeholder={"Event description"} ></StyledTextArea>
          </Form.Item>
          <Divider></Divider>
          <Title level={5}>{eventDates.mainTitle}</Title>
          <Form.Item
            name={eventDates.start.name}
            label={eventDates.start.label}
            rules={eventDates.start.rules}
          >
            <StyledDatePicker placeholder={eventDates.start.placeholder} onFocus={onFocus} />
          </Form.Item>
          <Form.Item rules={eventDates.end.rules} name={eventDates.end.name} label={eventDates.end.label} >
            <StyledDatePicker placeholder={eventDates.start.placeholder} onFocus={onFocus} />
          </Form.Item>
        </Form>
      </Col>
      <Divider></Divider>
      <SubmitWrapperCol span={24}>
        <SubmitButton onClick={goNext} type="primary">
          next
        </SubmitButton>
      </SubmitWrapperCol>
    </StepRow>
  );
}

// 함수로 작성한 styled component를 선언하세요.

const SubmitButton = styled(Button)(({ theme }) => {
  return {
    borderRadius: 8,
    width: 100,
  };
});

const StyledDatePicker = styled(AntDatePicker)(({ theme }) => {
  return {
    ["&&"]: {
      width: "100%",
    },
  };
});

const StyledTextArea = styled(Input.TextArea)(({ theme }) => {
  return {
    ["&&"]: {
      height: 100,
    },
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
