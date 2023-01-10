// import dependency modules : package.json에 명시된 외부모듈을 선언하세요.
import { useRouter } from 'next/router';
import { Button, Form, FormProps, Input, message } from 'antd';
import Password from 'antd/lib/input/Password';

export default function LoginForm() {
  const [form] = Form.useForm();
  const router = useRouter();

  const formProps: FormProps = {
    form,
    layout: 'vertical',
    autoComplete: 'off',
    onFinish(fields: any) {
      //login logic hided
    },
  };

  return (
    <Form {...formProps}>
      <Form.Item name="username" required label="USERNAME">
        <Input />
      </Form.Item>
      <Form.Item name="password" required label="PASSWORD">
        <Password />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">Login</Button>
      </Form.Item>
    </Form>
  );
}

// 함수로 작성한 styled component를 선언하세요.
