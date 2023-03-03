import styled from 'styled-components'
import {Button, Form, Input} from 'antd'
import {message} from 'antd'
import {ERROECODE} from 'libs/constant'
import {useStores} from 'stores'
import {useNavigate} from 'react-router-dom'

const Wrapper = styled.div`
  max-width: 600px;
  margin: 30px auto;
  box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 20px;
`

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
`


const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
}
const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 18,
  },
}

const validateUsername = (rule, value) => {
  if(!value) return Promise.resolve()
  if (/\W/.test(value)) return Promise.reject('只能是字母数字下划线')
  if (value.length < 4 || value.length > 10) return Promise.reject('长度为4~10个字符')
  return Promise.resolve()
}

const validateConfirm = ({getFieldValue}) => ({
  validator(rule, value) {
    if (getFieldValue('password') === value) return Promise.resolve()
    return Promise.reject('两次密码不一致')
  }
})


function Register() {
  const [name] = Form.useForm()
  const {AuthStore} = useStores()
  const navigate = useNavigate()
  const onFinish = ({username, password}) => {
    AuthStore.setUsername(username)
    AuthStore.setPassword(password)
    AuthStore.register().then(() => {
      navigate('/')
    }).catch((error) => {
      message.error(ERROECODE[error.code]).then()
      name.setFieldsValue({'username': ''})
    })
  }
  
  const onFinishFailed = () => {
  }
  return (
    <Wrapper>
      <Title>注册</Title>
      <Form
        {...layout}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={name}
        autoComplete='off'
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            {
              required: true,
              message: '输入用户名',
            },
            {
              validator: validateUsername
            }
          ]}
        >
          <Input/>
        </Form.Item>
        
        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: '输入密码',
            },
            {
              min: 4,
              message: '最少4个字符'
            },
            {
              max: 10,
              message: '最大10个字符'
            }
          ]}
        >
          <Input.Password/>
        </Form.Item>
        
        <Form.Item
          label="确认密码"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: '再次确认密码',
            },
            validateConfirm
          ]}
        >
          <Input.Password/>
        </Form.Item>
        
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  )
}

export default Register