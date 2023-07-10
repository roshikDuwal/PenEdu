import React, { useEffect, useMemo, useState } from 'react'

import { NavLink, useParams } from 'react-router-dom'
import { Button } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import "../../../../student.scss"
import Overview from '../../../overview/Overview';
import Navbar from '../../../../../components/panelnavbar/Navbar';
// import CustomReactTable from "../../../../../components/customreacttable/CustomReactTable"
import CustomReactTable from '../../../../../components/CustomReactTable/CustomReactTable';
import { getAssignments } from '../../../../../services/assignments';
import { getUnits, getUnitsByCourse } from '../../../../../services/units';
import Result from '../../../result/Result';
import Sidebar from '../../../../../components/sidebar/Sidebar';
import { getCurrentRole, roles } from '../../../../../utils/common';


const StudentAssignment = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [units, setUnits] = useState([]);
  const [openAccordan, setOpenAccordan] = useState(null);
  const { id, courseid } = useParams();


  const getData = async () => {
    setLoading(true);

    const data = await getAssignments(id);
    setData(data.unitAssignments);

    const units = await getUnitsByCourse(courseid);
    setUnits(units.units);

    setLoading(false);
  };

  useEffect(() => {
    if (getCurrentRole() === roles.student) {
      getData();
    }
  }, []);



  const columns = useMemo(
    () => [
      // { Header: 'Assignment Id', accessor: 'id' },
      { Header: 'Assignment Name', accessor: 'title' },
      {
        Header: "View Pdf",
        Cell: ({ row }) =>
        (<>{
          <NavLink to={`/dashboard/result/${courseid}/${id}/${row.original.id}`}>View</NavLink>
        }</>),
      },
      {
        Header: "View Video",
        Cell: ({ row }) =>
        (<>{
          <NavLink to={`/dashboard/result/${courseid}/${id}/${row.original.id}/video`}>View</NavLink>
        }</>),
      },

    ],
    [openAccordan, units]
  );


  return (
    <>
      <div className="studentpanel">
        <Sidebar />

        <div className="adminpanelpage">
          <Navbar data={JSON.parse(localStorage.getItem("user", "{}"))} />

          {/* -----startpage title---   */}
          <div className="snavigation">
            <NavLink to="/dashboard">Dashboard</NavLink> <ChevronRightIcon />
            <NavLink to="./..">Courses</NavLink> <ChevronRightIcon />
            <NavLink to="./..">Units</NavLink><ChevronRightIcon />
            <NavLink to="#">Assignments</NavLink>
          </div>
          {/* ---start-page end---  */}

          <div className="learner-box">
            <div className="learner-list">
              <div className="modal-btn">
                <h4>Units</h4>
                {/* <h6>({course})</h6> */}
              </div>
              
              <CustomReactTable
                columns={columns}
                data={data}
                loading={loading}
              />

            </div>
          </div>
        </div>
      </div>
    </>
  )

}

export default StudentAssignment