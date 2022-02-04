import styled from 'styled-components'
import imgUrl from 'components/logo.png'
import {NavLink} from 'react-router-dom'
import {Button} from 'antd'
import {useStores} from '../stores'
import {useHistory} from 'react-router-dom'
import {observer} from 'mobx-react'
import {useEffect} from 'react'

const Logo = styled.img`
  height: 1.5em;
  vertical-align: middle;
`
const StyleHeader = styled.header`
  background-color: #02101f;
  font-size: 1rem;
  display: flex;
  width: 100%;
  padding: 1em 7em;
  align-items: center;
  color: #fff;
`
const StyleNavLink = styled(NavLink)`
  color: #fff;
  margin-left: 2.5em;
  
  &.active {
    border-bottom: 1px solid #fff;
  }
`
const StyleLogin = styled.div`
  margin-left: auto;
  //padding-right: 1em;
  > button{
    margin-left: 1em;
  }
`

const  Header = observer(() => {
  const {UserStore, AuthStore, ListStore, ImageStore} = useStores()
  const history = useHistory()
  const handleLogout = () => {
    AuthStore.logout()
    ListStore.reset()
    ImageStore.reset()
  }
  
  const handleLogin = () => {
    history.push('/login')
  }
  
  const handleRegister = () => {
    history.push('register')
  }
  
  useEffect(() => {
    UserStore.pullUser()
  },[UserStore])
  
  return (
    <>
      <StyleHeader>
        <Logo src={imgUrl} />
        <StyleNavLink exact to="/home">首页</StyleNavLink>
        <StyleNavLink to="/history">历史</StyleNavLink>
        <StyleNavLink to="/about">关于我</StyleNavLink>
        <StyleLogin>
          {
            UserStore.currentUser ? <>
              {UserStore.currentUser.attributes.username} <Button type="primary" onClick={handleLogout}>注销</Button>
            </> : <>
              <Button type="primary" onClick={handleLogin}>登录</Button>
              <Button type="primary" onClick={handleRegister}>注册</Button>
            </>
          }
        </StyleLogin>
      </StyleHeader>
    </>
  )
})

export {Header}