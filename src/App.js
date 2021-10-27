import './App.css'
import {Header} from './components/Header'
import {Switch, Route} from 'react-router-dom'
import {lazy, Suspense} from 'react'
import {Footer} from 'components/Footer'
import {Loading} from './components/Loading'

const Home = lazy(() => import('./views/Home').then())
const ViewHistory = lazy(() => import('./views/ViewHistory').then())
const About = lazy(() => import('./views/About').then())
const Login = lazy(() => import('./views/Login').then())
const Register = lazy(() => import('./views/Register').then())

function App() {
  return (
    <>
      <Header/>
      <main>
        <Suspense fallback={<Loading/>}>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/home" exact component={Home}/>
            <Route path="/history" component={ViewHistory}/>
            <Route path="/about" component={About}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
          </Switch>
        </Suspense>
      </main>
      <Footer/>
    </
    
    
    
    >
  )
}

export default App
