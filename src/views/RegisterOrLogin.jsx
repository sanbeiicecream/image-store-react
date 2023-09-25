import styled from 'styled-components';
import { Button, Form, Input } from 'antd';
import { message } from 'antd';
import { useStores } from 'stores';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { useCallback, useEffect, useRef } from 'react';
import { isMobileDevice } from 'utils/tool';

const Wrapper = styled.div`
  max-width: 600px;
  width: 500px;
  margin: 30px auto;
  box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 20px 50px;
  //
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  transition: transform 0.2s ease-out;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
  //
  @media (max-width: 550px) {
    margin-top: 100px;
    padding: 20px;
    width: auto;
    position: initial;
    transform: none;
  }
  @media (max-width: 375px) {
    margin-top: 10px;
    padding: 20px;
  }
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
`;

const layout = {
  labelCol: {
    span: 4,
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
  const [name] = Form.useForm();
  const { AuthStore, UserStore } = useStores();
  const loginStatus = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();
  const onFinishRegister = ({ username, password }) => {
    AuthStore.setUsername(username);
    AuthStore.setPassword(password);
    AuthStore.register()
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        message.error(error.msg).then();
        name.setFieldsValue({ username: '' });
      });
  };

  const onFinishLogin = useCallback(
    ({ username, password }) => {
      loginStatus.current = true;
      AuthStore.setUsername(username);
      AuthStore.setPassword(password);
      AuthStore.login()
        .then(() => {
          message.success('登录成功', 0.5);
          navigate('/');
        })
        .catch(error => {
          message.error(error.msg);
        })
        .finally(() => {
          loginStatus.current = false;
        });
    },
    [AuthStore, navigate]
  );

  useEffect(() => {
    if (isMobileDevice()) {
      return;
    }
    const panel = document.getElementById('panel');
    const tiltMultiplier = 0.5; // 倾斜角度的倍数
    const sway = e => {
      const xPos = e.clientX;
      const yPos = e.clientY;

      const xCenter = window.innerWidth / 2;
      const yCenter = window.innerHeight / 2;

      const deltaX = xPos - xCenter;
      const deltaY = yPos - yCenter;

      const tiltX = (deltaY / yCenter) * 15 * tiltMultiplier; // 设置倾斜的角度，这里使用 15 度，并乘以倍数
      const tiltY = (deltaX / xCenter) * 15 * tiltMultiplier;

      panel.style.transform = `translate(-50%, -50%) perspective(800px) rotateX(${tiltY}deg) rotateY(${-tiltX}deg)`;
    };
    document.addEventListener('mousemove', sway);
    return () => {
      if (!isMobileDevice()) {
        document.removeEventListener('mousemove', sway);
      }
      return;
    };
  }, []);

  return (
    <Wrapper id='panel'>
      {UserStore.currentUser && <Navigate to='/home' replace={true} />}
      <Title>{location.pathname === '/register' ? '注册' : '登录'}</Title>
      {location.pathname === '/register' ? (
        <Form
          {...layout}
          name='basic'
          onFinish={onFinishRegister}
          form={name}
          autoComplete='off'
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

          <Form.Item style={{ textAlign: 'center' }}>
            <Button type='primary' htmlType='submit'>
              提交
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <Form name='basic' onFinish={onFinishLogin} {...layout}>
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

          <Form.Item style={{ textAlign: 'center' }}>
            <Button type='primary' htmlType='submit'>
              提交
            </Button>
          </Form.Item>
        </Form>
      )}
    </Wrapper>
  );
}

export default RegisterOrLogin;
