import React, { useEffect, useState } from "react";
import "./admin.scss";
import "./student.scss"
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/panelnavbar/Navbar";
import Overview from "../studentpanel/tabbar/overview/Overview";
import { getCurrentRole, roles } from "../utils/common";

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { classData } from "../services/class";
import { error } from "../utils/toast";
import {  getCoursesByClass } from "../services/courses";

const Adminpanel = () => {

  const [data, setData] = useState([]);
  const [myClass, setMyClass] = useState(null);

  const getCourseData = async () => {

    try {
      const classes = await classData();
      let data;
      if (getCurrentRole() === roles.student) {
        const cls = classes[0];
        setMyClass(cls);
        data = await getCoursesByClass(cls.id);
      } 
      setData(data.course);

    } catch (e) {
      error(e.message);
    }
 
  };

  useEffect(() => {
    if (getCurrentRole() === roles.student) {
      getCourseData();
    }
  }, []);


 
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

              <div className="astudentpanel">

                <div className="adminpanelpage">
                 
                  {/* -----startpage title---   */}
                  <div className="navigation">
                    <div className='titlenavigate'>Home</div><ChevronRightIcon />  <div className='titlenavigate'>Roshin Lakhemaru</div>
                  </div>
                  {/* ---start-page end---  */}


                  {/* student page starts  */}
                  <section className="studentpage">
                    <div className="studentdescription">

                      <div className="info">
                        <AccountCircleIcon/>
                       
                        <div className="name">
                          <h5>Roshin Lakhemaru</h5>
                          <p>1234789</p>
                        </div>
                      </div>

                      <div className="studentnavbar">
                        <div className="react-tabs ">
                          <div className="tabpanel">
                            <div className='tabbar'>
                              <Overview data={data} />
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>

                  </section>
                </div>
              </div>



            ) : (
              <h1>WELCOME TO ADMIN PAGE</h1>
            )}
          </div>
        </div>
      </div >
    </>
  );
};

export default Adminpanel;
