import React, { useEffect, useState } from "react";


import "./video.scss";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { NavLink, useParams } from "react-router-dom";
import { Button } from "@mui/material";

import { ThreeDots } from "react-loader-spinner";


import { getAssignment } from "../../../../../../services/assignments";
import Overview from "../../../../overview/Overview";
import StudentCourse from "../../../../course/StudentCourse";
import Navbar from "../../../../../../components/panelnavbar/Navbar";
import Video from "./Video";




const ShowVideo = () => {
  const [loading, setLoading] = useState(true);
  const [assignment, setAssignment] = useState([]);
  const { unit_id, id } = useParams();


  const getData = async () => {
    setLoading(true);
    const data = await getAssignment(id);
    setAssignment(data.unitAssignmentQuestions);
    setLoading(false);
  };

  
  useEffect(()=>{
    getData()
  },[])


  return (
    <>
      <div className="videopanel">
        <div className="adminpanelpage">
          <Navbar data={JSON.parse(localStorage.getItem("user", "{}"))} />

          {/* -----startpage title---   */}
          <div className="navigation">
            <div className='titlenavigate'>Home</div><ChevronRightIcon />  <div className='titlenavigate'>Roshin Lakhemaru</div><ChevronRightIcon />  <div className='titlenavigate'>Course Unit</div><ChevronRightIcon />  <div className='titlenavigate'>Unit Assignment</div><ChevronRightIcon /> 
            <div className="titlenavigate">Assignment {id}</div><ChevronRightIcon />  <div className='titlenavigate'>Video</div>
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
                    <div className="tabbar">
                      <Overview />
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div className="tabbar">
                        <StudentCourse/>
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div className="tabbar">
                      <div className="box">
                      <NavLink to={`/student/result/${unit_id}`}>
                        <Button>Back</Button>
                      </NavLink>
                        <h3>Video of Assignment {id}</h3>
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
                        <Video data={assignment} />
                      )}
                    </div>
                  </TabPanel>
                </Tabs>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ShowVideo;
