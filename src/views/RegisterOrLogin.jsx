import { Button, Form, Input } from 'antd';
import { message } from 'antd';
import { useStore } from '@/stores';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { useCallback, useEffect, useRef } from 'react';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  title: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  wrapper: {
    maxWidth: '600px',
    width: {
      default: '500px',
      '@media(max-width: 500px)': '72vw',
    },
    margin: '30px auto',
    boxShadow: '2px 2px 4px 0 rgba(0, 0, 0, 0.2)',
    borderRadius: '4px',
    padding: '20px 50px',
    perspective: '800px',
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
});

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

const validateUsername = (rule, value) => {
  if (!value) return Promise.resolve();
  if (/\W/.test(value)) return Promise.reject('只能是字母数字下划线');
  if (value.length < 4 || value.length > 10)
    return Promise.reject('长度为4~10个字符');
  return Promise.resolve();
};

const validateConfirm = ({ getFieldValue }) => ({
  validator(rule, value) {
    if (getFieldValue('password') === value) return Promise.resolve();
    return Promise.reject('两次密码不一致');
  },
});

function RegisterOrLogin() {
  const [form] = Form.useForm();
  const currentUser = useStore(state => state.currentUser);
  const setUsername = useStore(state => state.setUsername);
  const setPassword = useStore(state => state.setPassword);
  const login = useStore(state => state.login);
  const register = useStore(state => state.register);
  const loginStatus = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  const onFinishRegister = ({ username, password }) => {
    setUsername(username);
    setPassword(password);
    register()
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        message.error(error.msg).then();
        form.setFieldsValue({ username: '' });
      });
  };

  useEffect(() => {
    if (form) {
      form.resetFields();
    }
  }, [location, form]);

  const onFinishLogin = useCallback(
    async ({ username, password }) => {
      loginStatus.current = true;
      setUsername(username);
      setPassword(password);
      const res = await login();
      if (res.success) {
        message.success('登录成功', 0.8);
        navigate('/');
      } else {
        message.error(res?.msg || '登录失败！');
      }
      loginStatus.current = false;
    },
    [login, setPassword, setUsername, navigate]
  );

  return (
    <div {...stylex.props(styles.wrapper)}>
      {currentUser && <Navigate to='/home' replace={true} />}
      <div {...stylex.props(styles.title)}>
        {location.pathname === '/register' ? '注册' : '登录'}
      </div>
      <Form
        {...layout}
        name='basic'
        onFinish={
          location.pathname === '/register' ? onFinishRegister : onFinishLogin
        }
        form={form}
        autoComplete='off'
      >
        {location.pathname === '/register' ? (
          <>
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

            <Form.Item
              label='确认密码'
              name='confirmPassword'
              rules={[
                {
                  required: true,
                  message: '再次确认密码',
                },
                validateConfirm,
              ]}
            >
              <Input.Password />
            </Form.Item>
          </>
        ) : (
          <>
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
              label='&emsp;密码'
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
          </>
        )}
        <div {...stylex.props(styles.buttonWrapper)}>
          <Button type='primary' htmlType='submit'>
            提交
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default RegisterOrLogin;
