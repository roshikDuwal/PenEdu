import React, { useEffect, useState } from "react";


import "../../../../student.scss";
import Navbar from "../../../../../components/panelnavbar/Navbar";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Overview from "../../../overview/Overview";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { NavLink, useParams } from "react-router-dom";
import { Button } from "@mui/material";

import { ThreeDots } from "react-loader-spinner";

import ResultCanva from "./Canva/ResultCanva";
import { getAssignments } from "../../../../../services/assignments";
import Sidebar from "../../../../../components/sidebar/Sidebar";
import { getCurrentRole, roles } from "../../../../../utils/common";



const ShowAssignment = () => {
  const [loading, setLoading] = useState(true);
  const [assignment, setAssignment] = useState([]);
  const { unitid, assignmentid } = useParams();

  const getData = async () => {
    setLoading(true);

    const data = await getAssignments(unitid);
  
    data.unitAssignments.filter((filteredCourse) => filteredCourse.id == assignmentid).map((filterCourse, index) => {
      setAssignment(filterCourse);
    })

    setLoading(false);
  };

  useEffect(() => {
    if (getCurrentRole() === roles.student) {
      getData();
    }
  }, []);




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
            <NavLink to="#">{assignment.title}</NavLink>
          </div>
          {/* ---start-page end---  */}


          <div className="learner-box">
            <div className="learner-list">
              <div className="modal-btn">
                <h4>{assignment.title} (Result)</h4>
                {/* <h6>({course})</h6> */}
              </div>
              <NavLink to="./..">
                <Button>Back</Button>
              </NavLink>
              {loading ? (
                <>
                  <ThreeDots
                    height="80"
                    width="80"
                    radius="9"
                    color="#5b58ff"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                  />
                </>
              ) : (
                <ResultCanva {...assignment} />
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowAssignment;
