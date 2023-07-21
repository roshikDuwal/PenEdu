import React, { useEffect, useState } from "react";

import "./video.scss";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";


import "react-tabs/style/react-tabs.css";
import { NavLink, useParams } from "react-router-dom";
import { Button } from "@mui/material";

import { ThreeDots } from "react-loader-spinner";

import { getAssignment, getAssignments, getSubmits } from "../../../../../../services/assignments";

import Navbar from "../../../../../../components/panelnavbar/Navbar";
import Video from "./Video";
import Sidebar from "../../../../../../components/sidebar/Sidebar";
import { getCurrentRole, roles } from "../../../../../../utils/common";

const ShowVideo = () => {
  const [loading, setLoading] = useState(true);
  const [assignment, setAssignment] = useState([]);
  const [allData, setAllData] = useState([])
  const [assignmentDetail, setAssignmentDetail] = useState([]);
  const { unitid, assignmentid } = useParams();

  const getData = async (id) => {
    setLoading(true);
    const data = await getSubmits(id);
    const singleChecks = data.getSingleCheckAssessment.filter((sc) => {
      return sc.single_questions.unit_assignment_id.toString() === assignmentid.toString();
    });

    const indivQues = singleChecks.map((cs) => cs.single_questions);
    setAssignment(indivQues);
    setAllData(singleChecks)
    setLoading(false);
  };

  useEffect(() => {
    getData(assignmentid);
  }, [])

  const getAssignmentData = async () => {
    setLoading(true);

    const data = await getAssignments(unitid);

    data.unitAssignments.filter((filteredCourse) => filteredCourse.id == assignmentid).map((filterCourse, index) => {
      setAssignmentDetail(filterCourse);
    })

    setLoading(false);
  };

  useEffect(() => {
    if (getCurrentRole() === roles.student) {
      getAssignmentData();
    }
  }, []);






  return (
    <>
      <div className="videopanel">
        <Sidebar />
        <div className="adminpanelpage">
          <Navbar data={JSON.parse(localStorage.getItem("user", "{}"))} />

          {/* -----startpage title---   */}
          <div className="navigation">
            <NavLink to="/dashboard">Dashboard</NavLink> <ChevronRightIcon />
            <NavLink to="./..">Courses</NavLink> <ChevronRightIcon />
            <NavLink to="./..">Units</NavLink><ChevronRightIcon />
            <NavLink to="#">{assignmentDetail.title}</NavLink>
          </div>
          {/* ---start-page end---  */}

          {/* student page starts  */}
          <section className="studentpage">
            <div className="studentdescription">
              <div className="tabbar">
                <div className="box">
                  <h3>Video of {assignmentDetail.title} </h3>
                </div>

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
                  <div className="studentnavbar">
                    <Video data={assignment} alldata={allData} />
                  </div>

                )}
              </div>

            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ShowVideo;
