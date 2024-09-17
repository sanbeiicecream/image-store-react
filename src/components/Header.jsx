import imgUrl from '../assets/pic/logo.png';
import { NavLink } from 'react-router-dom';
import { Button } from 'antd';
import { useStore } from '../stores/index';
import { useNavigate } from 'react-router-dom';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  logo: {
    height: '1.5em',
    verticalAlign: 'middle',
  },
  header: {
    display: 'flex',
    justifyContent: {
      '@media (max-width: 550px)': 'space-around',
    },
    padding: {
      default: '1.8em 2em',
      '@media (max-width: 550px)': '1em 0.5em !important',
    },
    height: '6vh',
    backgroundColor: '#02101f',
    fontSize: {
      default: '1rem',
      '@media (max-width: 550px)': '12px',
    },
    width: '100%',
    alignItems: 'center',
    color: '#fff',
  },
  nav: {
    display: 'flex',
  },
  link: {
    display: 'block',
    color: '#fff',
    marginLeft: '2.5em',
  },
  login: {
    marginLeft: 'auto',
  },
  button: {
    margin: 0,
    marginLeft: {
      default: '1em',
      '@media (max-width: 550px)': '0.5em',
    },
    transform: {
      default: null,
      '@media (max-width: 550px)': 'scale(0.8)',
    },
  },
});

const Header = () => {
  const logout = useStore(state => state.logout);
  const currentUser = useStore(state => state.currentUser);
  const resetList = useStore(state => state.resetList);
  const resetFileInfo = useStore(state => state.resetFileInfo);

  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    resetList();
    resetFileInfo();
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('register');
  };

  return (
    <>
      <header className={`nav-header ${stylex.props(styles.header).className}`}>
        <img src={imgUrl} {...stylex.props(styles.logo)} />
        <div {...stylex.props(styles.nav)}>
          {[
            { name: '首页', url: '/home' },
            { name: '历史', url: '/history' },
            { name: '关于我', url: '/about' },
          ].map(item => (
            <NavLink to={item.url} key={item.name} className='nav-link'>
              {item.name}
            </NavLink>
          ))}
        </div>

        <div {...stylex.props(styles.login)}>
          {currentUser ? (
            <>
              {currentUser.username}{' '}
              <Button
                type='primary'
                onClick={handleLogout}
                {...stylex.props(styles.button)}
              >
                注销
              </Button>
            </>
          ) : (
            <>
              <Button
                type='primary'
                onClick={handleLogin}
                {...stylex.props(styles.button)}
              >
                登录
              </Button>
              <Button
                type='primary'
                onClick={handleRegister}
                {...stylex.props(styles.button)}
              >
                注册
              </Button>
            </>
          )}
        </div>
      </header>
    </>
  );
};

export { Header };
