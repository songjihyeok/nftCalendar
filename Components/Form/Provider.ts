import { useState } from "react";
import constate from "constate";
import { Form } from "antd"

// state의 type을 지정해주세요.
type CurrentProps = number;

interface formValue {
  blockChainId?: number,
  category?: string,
  tags: string[]
  checked?: boolean
  description?: string
  discordUrl?: string
  isVerified?: boolean
  email?: string
  endDateTime?: string
  coverImage?: string,
  marketPlaceUrl?: string
  marketplaceId?: number
  announcementUrl?: string
  startDateTime?: string
  title?: string
  twitterUrl?: string
  websiteUrl?: string
  transactionHash?: string
}


function useSubmit() {
  // counter 예제입니다.
  const [current, setCurrent] = useState<CurrentProps>(0);
  const [formValues, setFormValues] = useState<formValue | null>(null)

  return { current, setCurrent, formValues, setFormValues };
}

const [Provider, useCurrent, useSetCurrent, useFormValues, useSetFormValues] = constate(
  useSubmit,
  (value) => value.current,
  (value) => value.setCurrent,
  (value) => value.formValues,
  (value) => value.setFormValues,
);
export { Provider, useCurrent, useSetCurrent, useFormValues, useSetFormValues };
