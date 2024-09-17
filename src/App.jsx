import './App.css';
import { Header } from './components/Header.jsx';
import { Route, Routes, Navigate } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { Footer } from './components/Footer.jsx';
import { Loading } from './components/Loading.jsx';
import MyErrorBoundary from './components/MyErrorBoundary.jsx';
import { useNavigate } from 'react-router-dom';
import 'antd/dist/reset.css';
import { Spin, message } from 'antd';
import { useStore } from '@/stores';
import stylex from '@stylexjs/stylex';

const Home = lazy(() => import('./views/Home').then());
const ViewHistory = lazy(() => import('./views/ViewHistory').then());
const About = lazy(() => import('./views/About').then());
const RegisterOrLogin = lazy(() => import('./views/RegisterOrLogin').then());

const styles = stylex.create({
  main: {
    height: 'calc(100vh - 6vh - 4vh - 20px)',
    flexGrow: 1,
    overflow: 'auto',
    padding: '20px 20px 0 20px',
  },
});
function App() {
  const loading = useStore(set => set.loading);
  const initalUser = useStore(state => state.initalUser);
  const currentUser = useStore(state => state.currentUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (
      !localStorage.getItem('authorization') ||
      localStorage.getItem('authorization') === 'undefined' ||
      currentUser
    ) {
      return;
    }
    // TODO 成功获取数据后需要做一下路由鉴权
    initalUser()
      .then(() => {
        if (
          window.location.hash?.includes('register') ||
          window.location.hash?.includes('login')
        ) {
          navigate('/home');
        }
      })
      .catch(res => message.error(res.msg));
  }, [currentUser, initalUser, navigate]);
  return (
    <Spin spinning={loading} tip='上传中'>
      <Header />
      <main id='scrollableDiv' {...stylex.props(styles.main)}>
        <MyErrorBoundary>
          <Routes>
            <Route path='/' element={<Navigate replace to='/home' />} />
            <Route
              path='/home'
              element={
                <Suspense fallback={<Loading />}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path='/history'
              element={
                <Suspense fallback={<Loading />}>
                  <ViewHistory />
                </Suspense>
              }
            />
            <Route
              path='/about'
              element={
                <Suspense fallback={<Loading />}>
                  <About />
                </Suspense>
              }
            />
            <Route
              path='/login'
              element={
                <Suspense fallback={<Loading />}>
                  <RegisterOrLogin />
                </Suspense>
              }
              loader={() => {}}
            />
            <Route
              path='/register'
              element={
                <Suspense fallback={<Loading />}>
                  <RegisterOrLogin />
                </Suspense>
              }
            />
          </Routes>
        </MyErrorBoundary>
      </main>
      <Footer />
    </Spin>
  );
}

export default App;
