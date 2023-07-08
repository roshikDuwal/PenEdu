import React, { useEffect, useMemo, useState } from 'react'
import { getCourses } from '../../../services/courses'
import CustomStudentReactTable from '../../customstudentreacttable/CustomStudenteactTable'
import Navbar from '../../../components/panelnavbar/Navbar'
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { NavLink } from 'react-router-dom';
import Overview from '../overview/Overview';
import Result from '../result/Result';

const StudentCourse = () => {
    const [course,setCourse]=useState([])
    const [loading,setLoading]=useState(false)

    const GetCourse = async()=>{
        setLoading(true)
        const data = await getCourses()
        setCourse(data.course)
        setLoading(false)
    }

    useEffect(()=>{
        GetCourse()
    },[])

    const columns = useMemo(
        () => [
          { Header: "Course Id", accessor: "id" },
          { Header: "Course Name", accessor: "course_name" },
          { Header: "Course Code", accessor: "course_code" },
          { Header: "Credit hours", accessor: "credit_hours" },
        ],
      );

  return (
    <>
                <div className="studentpanel">

<div className="adminpanelpage">
    <Navbar data={JSON.parse(localStorage.getItem("user", "{}"))} />

    {/* -----startpage title---   */}
    <div className="navigation">
        <div className='titlenavigate'>Home</div><ChevronRightIcon />  <div className='titlenavigate'>Roshin Lakhemaru</div> 
    </div>
    {/* ---start-page end---  */}


    {/* student page starts  */}
    <section className="studentpage">
        <div className="studentdescription">

            <div className="info">

                <h2>Logo</h2>
                <div className="name">
                    <h5>Roshin Lakhemaru</h5>
                    <p>1234789</p>
                </div>
            </div>

            <div className="studentnavbar">
                <Tabs  defaultIndex={1}>

                    <TabList>
                        <Tab><NavLink to="/student">OverView</NavLink></Tab>
                        <Tab><NavLink to="/student/course">Course</NavLink></Tab>
                        <Tab><NavLink to="/student/resultcourse">Result</NavLink></Tab>
                    </TabList>

                    <TabPanel>
                        <div className='tabbar'>
                            <Overview/>
                        </div>
                    </TabPanel>

                    <TabPanel>
                        <div className='tabbar'>
                        <CustomStudentReactTable columns={columns} data={course} loading={loading} rowClickable={true} unitResult={true}/>
                        </div>
                    </TabPanel>

                    <TabPanel>
                        <div className='tabbar'>
                           <Result/>
                        </div>
                    </TabPanel>

                </Tabs>
            </div>
        </div>

    </section>


</div>
</div>
       
    </>
  )
}

export default StudentCourse