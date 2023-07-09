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
import { getUnits } from '../../../../../services/units';
import Result from '../../../result/Result';


const StudentAssignment = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [units, setUnits] = useState([]);
  const [openAccordan, setOpenAccordan] = useState(null);
  const { id } = useParams();


  const getData = async () => {
    setLoading(true);
    const data = await getAssignments(id);
    setData(data.unitAssignment);

    const units = await getUnits();
    setUnits(units.unit);

    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

 

  const columns = useMemo(
    () => [
      {
        Header: "Unit",
        Cell: ({ row }) =>
        (<>{units.length && row.original.unit_id
          ? units.find((unit) =>
            unit.id.toString() === row.original.unit_id
          ).unit_name
          : ""}</>),
      },
      { Header: 'Assignment Id', accessor: 'id' },
      { Header: 'Assignment Name', accessor: 'title' },
      {
        Header: "View Pdf",
        Cell: ({ row }) =>
        (<>{
         <NavLink to= {`/student/result/${id}/${row.original.id}`}>View</NavLink>
        }</>),
      },
      {
        Header: "View Video",
        Cell: ({ row }) =>
        (<>{
         <NavLink to= {`/student/result/${id}/${row.original.id}/video`}>View</NavLink>
        }</>),
      },

    ],
    [openAccordan, units]
  );


  return (
    <>
      <div className="studentpanel">

        <div className="adminpanelpage">
          <Navbar data={JSON.parse(localStorage.getItem("user", "{}"))} />

          {/* -----startpage title---   */}
          <div className="navigation">
            <div className='titlenavigate'>Home</div><ChevronRightIcon />  <div className='titlenavigate'>Roshin Lakhemaru</div><ChevronRightIcon />  <div className='titlenavigate'>Course Unit</div><ChevronRightIcon />  <div className='titlenavigate'>Unit  Result Assignment</div>
          </div>
          {/* ---start-page end---  */}

          <CustomReactTable columns={columns} data={data}  />


        </div>
      </div>
    </>
  )

}

export default StudentAssignment