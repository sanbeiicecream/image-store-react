import styled from 'styled-components';
import imgUrl from '../assets/pic/logo.png';
import { NavLink } from 'react-router-dom';
import { Button, message } from 'antd';
import { useStores } from '../stores/index';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useEffect } from 'react';

const Logo = styled.img`
  height: 1.5em;
  vertical-align: middle;
`;
const StyleHeader = styled.header`
  background-color: #02101f;
  font-size: 1rem;
  display: flex;
  width: 100%;
  padding: 1em 2em;
  align-items: center;
  color: #fff;

  @media (max-width: 550px) {
    display: flex;
    justify-content: space-around;
    padding: 1em 0.5em 1em 0.5em !important;
    font-size: 15px !important;
    a {
      margin-left: 2em;
    }
    button {
      margin-right: 0.5em;
    }
  }
  @media (max-width: 380px) {
    display: flex;
    justify-content: space-between;
    padding: 1em 0.5em 1em 0.5em !important;
    font-size: 15px !important;
    a {
      margin-left: 1em;
    }
    button {
      margin-right: 0.5em;
      font-size: 0.8em;
    }
  }
`;
const StyleNavLink = styled(NavLink)`
  color: #fff;
  margin-left: 2.5em;

  &.active {
    border-bottom: 1px solid #fff;
  }
`;
const StyleLogin = styled.div`
  margin-left: auto;
  //padding-right: 1em;
  > button {
    margin-left: 1em;
  }
`;

const Header = observer(() => {
  const { UserStore, AuthStore, ListStore, ImageStore } = useStores();
  const navigate = useNavigate();
  const handleLogout = () => {
    AuthStore.logout();
    ListStore.reset();
    ImageStore.reset();
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('register');
  };

  useEffect(() => {
    if (
      !localStorage.getItem('authorization') ||
      localStorage.getItem('authorization') === 'undefined' ||
      UserStore.currentUser
    ) {
      return;
    }
    // TODO 成功获取数据后需要做一下路由鉴权
    UserStore.initalUser()
      .then(() => {
        if (
          window.location.hash?.includes('register') ||
          window.location.hash?.includes('login')
        ) {
          navigate('/home');
        }
      })
      .catch(res => message.error(res.msg));
  }, [ListStore, UserStore, navigate]);

  return (
    <>
      <StyleHeader>
        <Logo src={imgUrl} />
        <StyleNavLink to='/home'>首页</StyleNavLink>
        <StyleNavLink to='/history'>历史</StyleNavLink>
        <StyleNavLink to='/about'>关于我</StyleNavLink>
        <StyleLogin>
          {UserStore.currentUser ? (
            <>
              {UserStore.currentUser.username}{' '}
              <Button type='primary' onClick={handleLogout}>
                注销
              </Button>
            </>
          ) : (
            <>
              <Button type='primary' onClick={handleLogin}>
                登录
              </Button>
              <Button type='primary' onClick={handleRegister}>
                注册
              </Button>
            </>
          )}
        </StyleLogin>
      </StyleHeader>
    </>
  );
});

export { Header };
