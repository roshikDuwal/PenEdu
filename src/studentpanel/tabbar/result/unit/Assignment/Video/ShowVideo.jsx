import React, { useEffect, useState } from "react";

import "./video.scss";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { NavLink, useParams } from "react-router-dom";
import { Button } from "@mui/material";

import { ThreeDots } from "react-loader-spinner";

import { getAssignment } from "../../../../../../services/assignments";

import Navbar from "../../../../../../components/panelnavbar/Navbar";
import Video from "./Video";
import Sidebar from "../../../../../../components/sidebar/Sidebar";

const ShowVideo = () => {
  const [loading, setLoading] = useState(true);
  const [assignment, setAssignment] = useState([]);
  const { assignmentid } = useParams();

  const getData = async () => {
    setLoading(true);
    const data = await getSubmits(unitid);
    const singleChecks = data.getSingleCheckAssessment.filter((sc) => {
      return sc.single_questions.unit_assignment_id.toString() === assignmentid.toString();
    });
    console.log(singleChecks);
    const indivQues = singleChecks.map((cs) => cs.single_questions);
    setAssignment(indivQues);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [])




  return (
    <>
      <div className="videopanel">
        <Sidebar />
        <div className="adminpanelpage">
          <Navbar data={JSON.parse(localStorage.getItem("user", "{}"))} />

          {/* -----startpage title---   */}
          <div className="navigation">
            <div className="titlenavigate">Home</div>
            <ChevronRightIcon />{" "}
            <div className="titlenavigate">Roshin Lakhemaru</div>
            <ChevronRightIcon />{" "}
            <div className="titlenavigate">Course Unit</div>
            <ChevronRightIcon />{" "}
            <div className="titlenavigate">Unit Assignment</div>
            <ChevronRightIcon />
            <div className="titlenavigate">Assignment </div>
            <ChevronRightIcon /> <div className="titlenavigate">Video</div>
          </div>
          {/* ---start-page end---  */}

          {/* student page starts  */}
          <section className="studentpage">
            <div className="studentdescription">
              <div className="tabbar">
                <div className="box">
                  <h3>Video of Assignment </h3>
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
                    <Video data={assignment} />
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
