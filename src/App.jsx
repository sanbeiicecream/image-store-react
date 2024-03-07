import './App.css';
import { Header } from './components/Header.jsx';
import { Route, Routes, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Footer } from './components/Footer.jsx';
import { Loading } from './components/Loading.jsx';
import styled from 'styled-components';
import MyErrorBoundary from './components/MyErrorBoundary.jsx';
import 'antd/dist/reset.css';
import { Spin } from 'antd';
import { useAtom } from 'jotai';
import { globalStateAtom } from '@/main';

const Home = lazy(() => import('./views/Home').then());
const ViewHistory = lazy(() => import('./views/ViewHistory').then());
const About = lazy(() => import('./views/About').then());
const RegisterOrLogin = lazy(() => import('./views/RegisterOrLogin').then());

const Main = styled.div`
  height: calc(100vh - 6vh - 4vh);
  flex-grow: 1;
  overflow: auto;
  padding: 20px 20px 0 20px;
`;
function App() {
  const [globalState] = useAtom(globalStateAtom);
  return (
    <Spin spinning={globalState.loading} tip='上传中'>
      <Header />
      <Main id='scrollableDiv'>
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
      </Main>
      <Footer />
    </Spin>
  );
}

export default App;
