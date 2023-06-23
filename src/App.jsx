import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from "./pages/home/Home"
import Adminpanel from './superadmin/Adminpanel'
import "./app.scss"

import Learner from "./superadmin/Learner/Learner"
import Instructor from "./superadmin/Instructor/Instructor"
import Login from './pages/login/Login'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          
          <Route path='/admin'>
            <Route index element={<Adminpanel/>} />
            <Route path='/admin/learner' element={<Learner/>} />
            <Route path='/admin/instructor' element={<Instructor/>} />
          </Route>

          <Route path='/login' element={<Login/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App