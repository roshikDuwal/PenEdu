import React, { useEffect, useMemo, useState } from 'react'
import { getCourses, getCoursesByClass } from '../../../services/courses'
import CustomStudentReactTable from '../../customstudentreacttable/CustomStudenteactTable'
import Navbar from '../../../components/panelnavbar/Navbar'
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import Sidebar from '../../../components/sidebar/Sidebar';
import { error } from '../../../utils/toast';
import { classData } from '../../../services/class';
import { getCurrentRole ,roles} from '../../../utils/common';
import { NavLink } from 'react-router-dom';



const Result = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([]);
  const [myClass, setMyClass] = useState(null);


  const getCourseData = async () => {
    setLoading(true);
    try {
      const classes = await classData();
      let data;
      if (getCurrentRole() === roles.student) {
        const cls = classes[0];
        setMyClass(cls);
        data = await getCoursesByClass(cls.id);
      } else {
        data = await getCourses();
      }
      setData(data.course);

    } catch (e) {
      error(e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCourseData();
  }, []);

  const columns = useMemo(
    () => [
      // { Header: "Course Id", accessor: "id" },
      { Header: "Course Name", accessor: "course_name" },
      { Header: "Course Code", accessor: "course_code" },
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
          <NavLink to="/dashboard">Dashboard</NavLink> <ChevronRightIcon />{" "}
           <NavLink to="#">Courses</NavLink>
          </div>
          {/* ---start-page end---  */}

          <div className="learner-box">
            <div className="learner-list">
              <div className="modal-btn">
                <h4>Course Result</h4>
                {/* <h6>({course})</h6> */}
              </div>
              <CustomStudentReactTable columns={columns} data={data} loading={loading} rowClickable={true}  />

            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Result