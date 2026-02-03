import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Register from './pages/Register'
import Login from './pages/Login'
import JobProviderDashboard from './pages/JobProviderDashboard'
import PostJob from './pages/PostJob'


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element = {<Home/>} />
          <Route path="/register" element = {<Register/>} />
          <Route path="/login" element = {<Login/>} />
          <Route path="/job-provider-dashboard" element = {<JobProviderDashboard/>} />
          <Route path="/create-job-post" element = {<PostJob/>} />
          <Route path="*" element = {<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
