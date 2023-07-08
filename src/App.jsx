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

const App = () => {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />

          <Route path='/dashboard'>
            <Route index element={<Adminpanel/>} />
            <Route path='/dashboard/learner' element={<Learner/>} />
            <Route path='/dashboard/instructor' element={<Instructor/>} />
            <Route path='/dashboard/classyear' element={<Classyear/>} />

            <Route path='/dashboard/course' element={<Course/>} />
            {/* <Route path='/dashboard/unit' element={<List/>} />
            <Route path='/dashboard/unit/:id' element={<ListAssignment/>} />
            <Route path='/dashboard/unit/:id/add' element={<AddAssignment/>} />
            <Route path='/dashboard/unit/:unitId/:id' element={<UploadVideos/>} /> */}
          </Route>

          <Route path='/student' element={<Student/>}/>
          <Route path='student/unit' element={<StudentUnit/>} />
          <Route path='/student/unit/:id' element={<StudentAssignment/>} />
          <Route path='/student/unit/:unit_id/:id' element={<ShowAssignment/>} />

          {/* <Route path='admin/:courseid' element={<List/>}/>
          <Route path='/dashboard/:courseid/:id' element={<ListAssignment/>} />
          <Route path='/dashboard/:courseid/:unit_id/:id' element={<UploadVideos/>} /> */}

          <Route path='/dashboard/course/:courseid' element={<List/>} shouldRevalidate={true}/>
          <Route path='/dashboard/course/:courseid/:id' element={<ListAssignment/>} />
          <Route path='/dashboard/course/:courseid/:id/add' element={<AddAssignment/>} />
          <Route path='/dashboard/course/:courseid/:unit_id/:id' element={<UploadVideos/>} />

          <Route path='/login' element={<Login/>}/>

          <Route path='*' element={<Error/>}/>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App