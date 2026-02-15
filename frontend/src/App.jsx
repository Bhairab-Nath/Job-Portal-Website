import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Register from './pages/Register'
import Login from './pages/Login'
import JobProviderDashboard from './pages/JobProviderDashboard'
import SingleJob from './pages/SingleJob'
import CreateJob from './pages/CreateJob'
import EditJob from './pages/EditJob'
import ApplicantsList from './pages/ApplicantsList'


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element = {<Home/>} />
          <Route path="/register" element = {<Register/>} />
          <Route path="/login/:role" element = {<Login/>} />
          <Route path="/job-provider-dashboard" element = {<JobProviderDashboard/>} />
          <Route path="/create-job-post" element = {<CreateJob/>} />
          <Route path="/update-job-post/:id" element = {<EditJob/>} />
          <Route path="/applications/:jobId" element = {<ApplicantsList/>} />
          <Route path="/job/:id" element = {<SingleJob/>} />
          <Route path="/not-found" element = {<NotFound/>} />
          <Route path="*" element = {<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
