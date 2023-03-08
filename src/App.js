import './App.css'
import {Header} from './components/Header'
import {Route, Routes, Navigate} from 'react-router-dom'
import {lazy, Suspense} from 'react'
import {Footer} from 'components/Footer'
import {Loading} from './components/Loading'
import styled from 'styled-components'
import MyErrorBoundary from 'components/MyErrorBoundary';
import 'antd/dist/reset.css';

const Home = lazy(() => import('./views/Home').then())
const ViewHistory = lazy(() => import('./views/ViewHistory').then())
const About = lazy(() => import('./views/About').then())
const Login = lazy(() => import('./views/Login').then())
const Register = lazy(() => import('./views/Register').then())

const Main = styled.div`
  flex-grow: 1;
  padding: 20px;
  overflow: auto;
`
function App() {
  return (
    <>
      <Header/>
      <Main id="scrollableDiv">
        <MyErrorBoundary>
            <Routes>
              <Route path="/" element={<Navigate replace to="/home" />} />
              <Route path="/home" element={
                <Suspense fallback={<Loading/>}>
                  <Home />
                </Suspense>
              }/>
              <Route path="/history" element={
                <Suspense fallback={<Loading/>}>
                  <ViewHistory />
                </Suspense>
              }/>
              <Route path="/about" element={
                <Suspense fallback={<Loading/>}>
                  <About />
                </Suspense>
              }/>
              <Route path="/login" 
                element={
                  <Suspense fallback={<Loading/>}>
                    <Login />
                  </Suspense>
                }
                loader={() => {}}
              />
              <Route path="/register" element={
                <Suspense fallback={<Loading/>}>
                  <Register />
                </Suspense>
              }/>
            </Routes>

        </MyErrorBoundary>
      </Main>
      <Footer/>
    </>
  )
}

export default App
