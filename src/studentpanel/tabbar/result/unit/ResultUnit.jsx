import React, { useEffect, useMemo, useState } from 'react'


import { getUnits, getUnitsByCourse } from '../../../../services/units'
import { NavLink, useParams } from 'react-router-dom'
import { Button } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import 'react-tabs/style/react-tabs.css';
import "../result.scss"
import Navbar from '../../../../components/panelnavbar/Navbar'
import CustomReactTable from '../../../../components/CustomReactTable/CustomReactTable'
import Sidebar from '../../../../components/sidebar/Sidebar'
import { getCurrentRole, roles } from '../../../../utils/common'


const ResultUnit = () => {
  const [loading, setLoading] = React.useState(false);

  const [data, setData] = useState([]);
  const [course, setCourse] = useState(null);
  const [courses, setCourses] = useState([]);

  const { courseid } = useParams();

  const getData = async () => {
    setLoading(true);
    try {
      let data;
      if (getCurrentRole() === roles.student) {
        data = await getUnitsByCourse(courseid);
        data.units.length && setCourse(data.units[0].course.course_name);
      } else {
        data = await getUnits();
        setCourses(
          data?.course?.map((data) => {
            return { label: data.course_name, value: data.id };
          }) || []
        );
        setCourse(
          data.course?.length && courseid
            ? data.course.find((course) => course.id.toString() === courseid)
              .course_name
            : ""
        );
      }
      setData(data.unit || data.units);
    } catch (e) {
      error(e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [courseid]);

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
        <Sidebar />

        <div className="adminpanelpage">
          <Navbar data={JSON.parse(localStorage.getItem("user", "{}"))} />

          {/* -----startpage title---   */}
          <div className="snavigation">
            <NavLink to="/dashboard">Dashboard</NavLink> <ChevronRightIcon />
            <NavLink to="./..">Courses</NavLink> <ChevronRightIcon />
            <NavLink to="./..">Units({course})</NavLink>
          </div>
          {/* ---start-page end---  */}

          <div className="learner-box">
            <div className="learner-list">
              <div className="modal-btn">
                <h4>Units</h4>
                <h6>({course})</h6>
              </div>
              <CustomReactTable
                columns={columns}
                data={data}
                loading={loading}
                rowClickable={true}
              />

            </div>
          </div>
        </div>
      </div>
    </>
  )

}

export default ResultUnit