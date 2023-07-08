import React, { useEffect, useMemo, useState } from 'react'

import CustomStudentReactTable from '../../../customstudentreacttable/CustomStudenteactTable'
import { getUnits } from '../../../../services/units'
import { NavLink } from 'react-router-dom'
import { Button } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import "../../../student.scss"
import Overview from '../../overview/Overview'
import Navbar from '../../../../components/panelnavbar/Navbar'
import CustomReactTable from '../../../../components/CustomReactTable/CustomReactTable'
import StudentCourse from '../../course/StudentCourse'

const ResultUnit = () => {
  const [course, setCourse] = useState([])
  const [loading, setLoading] = useState(false)


  const GetUnit = async () => {
    setLoading(true)
    const data = await getUnits()
    setCourse(data.unit)
    setLoading(false)
  }

  useEffect(() => {
    GetUnit()
  }, [])

  const columns = useMemo(
    () => [
      { Header: "Unit Id", accessor: "id" },
      { Header: "Unit Name", accessor: "unit_name" },
      { Header: "Unit Code", accessor: "unit_code" },
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
            <div className='titlenavigate'>Home</div><ChevronRightIcon />  <div className='titlenavigate'>Roshin Lakhemaru</div><ChevronRightIcon /> <div className='titlenavigate'>Unit Result</div>
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
                <Tabs defaultIndex={2}>
                  <TabList>
                  <Tab><NavLink to="/student">OverView</NavLink></Tab>
                    <Tab><NavLink to="/student/course">Course</NavLink></Tab>
                    <Tab>Result</Tab>
                  </TabList>

                  <TabPanel>
                    <div className='tabbar'>
                      <Overview />
                    </div>

                  </TabPanel>
                  <TabPanel>
                    <div className='tabbar'>
                    <StudentCourse/>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className='tabbar'>
                    <NavLink to="./.."><Button>Back</Button></NavLink>
                      <CustomReactTable columns={columns} data={course} loading={loading} rowClickable={true} />
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

export default ResultUnit