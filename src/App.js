import './App.css'
import {Header} from './components/Header'
import {Route, Routes} from 'react-router-dom'
import {lazy, Suspense} from 'react'
import {Footer} from 'components/Footer'
import {Loading} from './components/Loading'
import styled from 'styled-components'
import MyErrorBoundary from 'components/MyErrorBoundary';
const Home = lazy(() => import('./views/Home').then())
const ViewHistory = lazy(() => import('./views/ViewHistory').then())
const About = lazy(() => import('./views/About').then())
const Login = lazy(() => import('./views/Login').then())
const Register = lazy(() => import('./views/Register').then())

const Main = styled.div`
  flex-grow: 1;
  padding: 5vh;
  overflow: auto;
`
function App() {
  return (
    <>
      <Header/>
      <Main>
        <MyErrorBoundary>
          <Suspense fallback={<Loading/>}>
            <Routes>
              <Route path="/" element={< Home />}/>
              <Route path="/home" element={<Home />}/>
              <Route path="/history" element={<ViewHistory />}/>
              <Route path="/about" element={<About />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/register" element={<Register />}/>
            </Routes>
          </Suspense>
        </MyErrorBoundary>
      </Main>
      <Footer/>
    </>
  )
}

export default App
