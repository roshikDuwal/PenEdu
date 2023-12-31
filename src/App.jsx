import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import Home from "./pages/home/Home"
import Adminpanel from './superadmin/Adminpanel'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./app.scss"


import Instructor from "./superadmin/Instructor/Instructor"
import Classyear from "./superadmin/class/Classyear"


import AdminLogin from "./pages/login/AdminLogin"
import Studentlogin from "./pages/login/Studentlogin"
import TeacherLogin from "./pages/login/TeacherLogin"

import List from './superadmin/unit/List'
import Error from './pages/error/Error'
import Course from './superadmin/course/course'
import AddAssignment from './superadmin/unit/assignment/AddAssignment';
import ListAssignment from './superadmin/unit/assignment/ListAssignment';
import UploadVideos from './superadmin/unit/assignment/UploadVideos';



import Learner from './superadmin/Learner/Learner';
import ResultUnit from './studentpanel/tabbar/result/unit/ResultUnit';
import AssignmentResult from './studentpanel/tabbar/result/unit/Assignment/StudentAssignment';
import ShowResultAssignment from "./studentpanel/tabbar/result/unit/Assignment/ShowResultAssignment"

import Result from './studentpanel/tabbar/result/Result';
import Check from './teacher/Check';
import ShowVideo from './studentpanel/tabbar/result/unit/Assignment/Video/ShowVideo';
import StudentAssignment from './studentpanel/tabbar/result/unit/Assignment/StudentAssignment';


const App = () => {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/dashboard'>
            <Route index element={<Adminpanel />} />
            <Route path='/dashboard/learner' element={<Learner/>} />
            <Route path='/dashboard/instructor' element={<Instructor/>} />
            <Route path='/dashboard/classyear' element={<Classyear/>} />

            <Route path='/dashboard/course' element={<Course/>} />
            <Route path='/dashboard/course/:courseid' element={<List/>} shouldRevalidate={true}/>
            <Route path='/dashboard/course/:courseid/:id' element={<ListAssignment/>} />
            <Route path='/dashboard/course/:courseid/:id/add' element={<AddAssignment/>} />
            <Route path='/dashboard/course/:courseid/:unit_id/:id' element={<UploadVideos/>} />

            <Route path='/dashboard/check' element={<Check/>} />

            <Route path='/dashboard/result' element={<Result/>} />
            <Route path='/dashboard/result/:courseid' element={<ResultUnit/>} shouldRevalidate={true}/>
            <Route path='/dashboard/result/:courseid/:id' element={<StudentAssignment/>} />
            <Route path='/dashboard/result/:courseid/:unitid/:assignmentid' element={<ShowResultAssignment/>}/>
            {/* <Route path='/dashboard/result/:courseid/:unitid/:assignmentid/video' element={<ShowVideo/>}/> */}
          </Route>

          <Route path='/dashboard/result/:courseid/:unitid/:assignmentid/video' element={<ShowVideo/>}/>

          {/* <Route path='/student' >
            <Route index element={<Student />} />
            <Route path='/student/course' element={<StudentCourse/>}/>
            <Route path='/student/unit' element={<StudentUnit />} />
            <Route path='/student/unit/:id' element={<StudentAssignment />} />
            <Route path='/student/unit/:unit_id/:id' element={<ShowAssignment />} />

            <Route path='/student/resultcourse' element={<Result/>}/>
            <Route path='/student/result' element={<ResultUnit/>} />
            <Route path='/student/result/:id' element={<AssignmentResult/>} />
            <Route path='/student/result/:unit_id/:id' element={<ShowResultAssignment/>}/>
            <Route path='/student/result/:unit_id/:id/video' element={<ShowVideo/>}/>
          </Route> */}

          <Route path='admin/login' element={<AdminLogin/>} />
          <Route path='student/login' element={<Studentlogin/>} />
          <Route path='teacher/login' element={<TeacherLogin/>} />

          <Route path='*' element={<Error />} />

        </Routes>
      </Router>

      <ToastContainer />
    </>
  )
}

export default App