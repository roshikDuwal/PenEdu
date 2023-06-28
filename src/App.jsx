import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from "./pages/home/Home"
import Adminpanel from './superadmin/Adminpanel'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./app.scss"

import Learner from './superadmin/learner/Learner'
import Instructor from "./superadmin/Instructor/Instructor"
import Classyear from "./superadmin/class/Classyear"

import Login from './pages/login/Login'
import List from './superadmin/unit/List'
import AddUnit from './superadmin/unit/add/AddUnit'
import Error from './pages/error/Error'
import Course from './superadmin/course/course'

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
            <Route path='/admin/classyear' element={<Classyear/>} />
            <Route path='/admin/unit' element={<List/>} />
            <Route path='/admin/course' element={<Course/>} />
            <Route path='/admin/unit/add' element={<AddUnit/>} />
          </Route>

          <Route path='/login' element={<Login/>}/>

          <Route path='*' element={<Error/>}/>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App