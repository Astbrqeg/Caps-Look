import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Projects from './pages/Projects/index'
import NavBar from './components/NavBar'
import Home from './pages/Home/index'
import Absence from './pages/Absence/index'
import Cadence from './pages/Cadence/index'
import Employee from './pages/Employes/index'
import Sidebar from './components/Sidebar'
import Scrums from './pages/Scrums/index'
import Login from './pages/Login/Login'
import Sites from './pages/Sites'
import Style from './style.module.scss'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.css'
import './reset.scss'
import './App.scss'
import Capacity from './pages/Capacity'
import React, { useEffect } from 'react'
import { getRole, isAuthorized } from './utils/useAuth'

function App() {
  const logToken = getRole(document.cookie.valueOf('userToken'))
  const isLoggedIn = document.cookie.indexOf('userToken') !== -1
  useEffect(() => {
    if (
      window.location.pathname !== '/' &&
      document.cookie.indexOf('userToken') === -1
    ) {
      window.location.href = '/'
    }
  }, [])
  if (window.location.pathname === '/' || !isLoggedIn) {
    return (
      <div style={{ textAlign: 'center' }}>
        <NavBar />
        <Login />
      </div>
    )
  }
  return (
    <div style={{ textAlign: 'center' }}>
      <Router>
        <NavBar />
        <div className={Style.pageBody}>
          <Sidebar />
          <div className={Style.mainPage}>
            <Routes>
              {isAuthorized(logToken, [
                'project_manager',
                'resource_manager',
                'scrum_master'
              ]) && <Route path="/home" element={<Home />} />}
              {isAuthorized(logToken, [
                'project_manager',
                'resource_manager',
                'scrum_master',
                ''
              ]) && <Route path="/Projects" element={<Projects />} />}
              {isAuthorized(logToken, [
                'project_manager',
                'resource_manager',
                'scrum_master',
                ''
              ]) && <Route path="/Absence" element={<Absence />} />}
              {isAuthorized(logToken, [
                'project_manager',
                'resource_manager',
                'scrum_master'
              ]) && <Route path="/Employes" element={<Employee />} />}
              {isAuthorized(logToken, [
                'project_manager',
                'resource_manager',
                'scrum_master'
              ]) && <Route path="/Cadence" element={<Cadence />} />}
              {isAuthorized(logToken, [
                'project_manager',
                'resource_manager',
                'scrum_master'
              ]) && <Route path="/Scrums" element={<Scrums />} />}
              {isAuthorized(logToken, [
                'project_manager',
                'resource_manager',
                'scrum_master'
              ]) && <Route path="/Sites" element={<Sites />} />}
              {isAuthorized(logToken, [
                'project_manager',
                'resource_manager',
                'scrum_master'
              ]) && <Route path="/Capacity" element={<Capacity />} />}
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  )
}
export default App
