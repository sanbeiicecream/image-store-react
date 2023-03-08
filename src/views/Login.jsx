import styled from 'styled-components';
import { Button, Form, Input, message } from 'antd';
import { useStores } from '../stores/index';
import { useNavigate, Navigate} from 'react-router-dom';
import { useCallback, useEffect, useRef } from 'react';

const Wrapper = styled.div`
  max-width: 600px;
  margin: 30px auto;
  box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
`;

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 18,
  },
};

const validateUsername = (rule, value) => {
  if (!value) return Promise.reject();
  if (/\W/.test(value)) return Promise.reject('只能是字母数字下划线');
  if (value.length < 4 || value.length > 10)
    return Promise.reject('长度为4～10个字符');
  return Promise.resolve();
};

function Login() {
  const { AuthStore, UserStore } = useStores();
  const [form] = Form.useForm();
  const loginStatus = useRef(false);
  const navigate = useNavigate();
  const onFinish = useCallback(
    ({ username, password }) => {
      loginStatus.current = true
      AuthStore.setUsername(username);
      AuthStore.setPassword(password);
      AuthStore.login()
        .then(() => {
          message.success('登录成功', 0.5);
          navigate('/');
        })
        .catch((error) => {
          message.error(error.msg);
        }).finally(() => {
          loginStatus.current = false
        });
    },
    [AuthStore, navigate]
  );

  useEffect(() => {
    console.log('inner')
  }, [])

  const onFinishFailed = () => {};

  return (
    <Wrapper>
      {UserStore.currentUser && (
        <Navigate to="/home" replace={true} />
        )
      }
      <Title>登录</Title>
      <Form
        {...layout}
        name='basic'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
      >
        <Form.Item
          label='用户名'
          name='username'
          rules={[
            {
              required: true,
              message: '输入用户名',
            },
            {
              validator: validateUsername,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='密码'
          name='password'
          rules={[
            {
              required: true,
              message: '输入密码',
            },
            {
              min: 4,
              message: '最少4个字符',
            },
            {
              max: 10,
              message: '最大10个字符',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type='primary' htmlType='submit'>
            提交
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
}
export default Login;
