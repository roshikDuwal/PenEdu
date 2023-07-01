import React, { useEffect, useMemo, useState } from 'react'

import { NavLink } from 'react-router-dom'
import { Button } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import "../../../../student.scss"
import Overview from '../../../overview/Overview';
import Navbar from '../../../../../components/panelnavbar/Navbar';
// import CustomReactTable from "../../../../../components/customreacttable/CustomReactTable"
import CustomReactTable from '../../../../../components/CustomReactTable/CustomReactTable';

const StudentAssignment = () => {


  const assignment = useMemo(
    () => [
        { id: 1, name: 'Assignment 1', courseno: 28261, credit_hours:"4" },
        { id: 2, name: 'Assignment 2', courseno: 32261, credit_hours:"4" }
    ], []);

  const columns = useMemo(
    () => [
      { Header: "Assignment Id", accessor: "id" },
      { Header: "Assignment Name", accessor: "name" },
      { Header: "Assignment Code", accessor: "courseno" },
      { Header: "Credit hours", accessor: "credit_hours" },
    ],
  );

  const data = {
    name: "Roshin Lakhemaru"
  }
  return (
    <>
      <div className="studentpanel">

        <div className="adminpanelpage">
          <Navbar data={data} />

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
                <Tabs defaultIndex={1}>
                  <TabList>
                    <Tab > OverView</Tab>
                    <Tab>Assignment</Tab>
                    <Tab>Result</Tab>
                  </TabList>

                  <TabPanel>
                    <div className='tabbar'>
                      <Overview />
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div className='tabbar'>
                      <NavLink to="/student"><Button>Back</Button></NavLink>
                      <CustomReactTable columns={columns} data={assignment}  rowClickable={true} />
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div className='tabbar'>
                      Result
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

export default StudentAssignment