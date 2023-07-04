import React, { useEffect } from 'react'
import { BrowserRouter as Router,Routes,Route, useNavigate } from 'react-router-dom'
import Home from "./pages/home/Home"
import Adminpanel from './superadmin/Adminpanel'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./app.scss"

import Learner from './superadmin/Learner/Learner'
import Instructor from "./superadmin/Instructor/Instructor"
import Classyear from "./superadmin/class/Classyear"

import Login from './pages/login/Login'
import List from './superadmin/unit/List'
import Error from './pages/error/Error'
import Course from './superadmin/course/course'
import AddAssignment from './superadmin/unit/assignment/AddAssignment';
import ListAssignment from './superadmin/unit/assignment/ListAssignment';
import UploadVideos from './superadmin/unit/assignment/UploadVideos';

import Student from './studentpanel/Student';
import StudentUnit from "./studentpanel/tabbar/course/unit/StudentUnit"
import StudentAssignment from './studentpanel/tabbar/course/unit/Assignment/StudentAssignment';
import ShowAssignment from "./studentpanel/tabbar/course/unit/Assignment/ShowAssignment"
import axios from 'axios';


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

            <Route path='/admin/course' element={<Course/>} />
            <Route path='/admin/unit' element={<List/>} />
            <Route path='/admin/unit/:id' element={<ListAssignment/>} />
            <Route path='/admin/unit/:id/add' element={<AddAssignment/>} />
            <Route path='/admin/unit/:unitId/:id' element={<UploadVideos/>} />
          </Route>

          <Route path='/student' element={<Student/>}/>
          <Route path='student/unit' element={<StudentUnit/>} />
          <Route path='/student/unit/:id' element={<StudentAssignment/>} />
          <Route path='/student/unit/:unit_id/:id' element={<ShowAssignment/>} />

          <Route path='/login' element={<Login/>}/>

          <Route path='*' element={<Error/>}/>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App