import React from "react";
import "./admin.scss";
import "./student.scss"
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/panelnavbar/Navbar";
import Overview from "../studentpanel/tabbar/overview/Overview";
import { getCurrentRole, roles } from "../utils/common";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { NavLink } from "react-router-dom";
import StudentCourse from "../studentpanel/tabbar/course/StudentCourse";
import Result from "../studentpanel/tabbar/result/Result";

const Adminpanel = () => {
  const data = {
    name: "Admin",
  };
  return (
    <>
      <div className="adminpanel">
        <Sidebar />
        <div className="adminpanelpage">
          <Navbar data={JSON.parse(localStorage.getItem("user", "{}"))} />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {getCurrentRole() === roles.student ? (
              <div className="studentnavbar">
                <Tabs>
                  <TabList>
                    <Tab>
                      <NavLink to="/student">OverView</NavLink>
                    </Tab>
                    <Tab>
                      <NavLink to="/student/course">Course</NavLink>
                    </Tab>
                    <Tab>
                      <NavLink to="/student/resultcourse">Result</NavLink>
                    </Tab>
                  </TabList>

                  <TabPanel>
                    <div className="tabbar">
                      <Overview />
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div className="tabbar">
                      <StudentCourse />
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div className="tabbar">
                      <Result />
                    </div>
                  </TabPanel>
                </Tabs>
              </div>
            ) : (
              <h1>WELCOME TO ADMIN PAGE</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Adminpanel;
