import React, { useCallback, useEffect, useState } from "react";
import "./admin.scss";
import "./student.scss";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/panelnavbar/Navbar";
import Overview from "../studentpanel/tabbar/overview/Overview";
import { getCurrentRole, roles } from "../utils/common";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { classData } from "../services/class";
import { error } from "../utils/toast";
import { getCourses, getCoursesByClass } from "../services/courses";
import { ThreeDots } from "react-loader-spinner";

const Adminpanel = () => {
  const [data, setData] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [myClass, setMyClass] = useState(null);

  const dashboardCounters = useCallback(() => {
    return (
      <div className="row">
        <div className="col-lg-3 col-md-6">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <div className="row">
                <div className="col-xs-3">
                  <i className="fa fa-comments fa-4x"></i>
                </div>
                <div className="col-xs-9 text-right">
                  <div className="huge">0</div>
                  <div className="under-number">______</div>
                </div>
              </div>
            </div>
            <a href="#">
              <div className="panel-footer">
                <span className="pull-left green">View Details</span>
                <span className="pull-right green">
                  <i className="fa fa-arrow-circle-right"></i>
                </span>
                <div className="clearfix"></div>
              </div>
            </a>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="panel panel-green">
            <div className="panel-heading">
              <div className="row">
                <div className="col-xs-3">
                  <i className="fa fa-comments fa-4x"></i>
                </div>
                <div className="col-xs-9 text-right">
                  <div className="huge">0</div>
                  <div className="under-number">______</div>
                </div>
              </div>
            </div>
            <a href="#">
              <div className="panel-footer">
                <span className="pull-left green">View Details</span>
                <span className="pull-right green">
                  <i className="fa fa-arrow-circle-right"></i>
                </span>
                <div className="clearfix"></div>
              </div>
            </a>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="panel panel-yellow">
            <div className="panel-heading">
              <div className="row">
                <div className="col-xs-3">
                  <i className="fa fa-user fa-4x"></i>
                </div>
                <div className="col-xs-9 text-right">
                  <div className="huge">{classes.length}</div>
                  <div className="under-number"> Classes</div>
                </div>
              </div>
            </div>
            <a href="#">
              <div className="panel-footer">
                <span className="pull-left yellow">View Details</span>
                <span className="pull-right yellow">
                  <i className="fa fa-arrow-circle-right"></i>
                </span>
                <div className="clearfix"></div>
              </div>
            </a>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="panel panel-red">
            <div className="panel-heading">
              <div className="row">
                <div className="col-xs-3">
                  <i className="fa fa-list fa-4x"></i>
                </div>
                <div className="col-xs-9 text-right">
                  <div className="huge">{data.length}</div>
                  <div className="under-number">Courses</div>
                </div>
              </div>
            </div>
            <a href="#">
              <div className="panel-footer">
                <span className="pull-left red">View Details</span>
                <span className="pull-right red">
                  <i className="fa fa-arrow-circle-right"></i>
                </span>
                <div className="clearfix"></div>
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  }, [data]);

  const getCourseData = async () => {
    setLoading(true);
    try {
      const classes = await classData();
      let data;
      if (getCurrentRole() !== roles.admin) {
        const cls = classes[0];
        setMyClass(cls);
        data = await getCoursesByClass(cls.id);
      } else {
        data = await getCourses();
      }
      setData(data.course || data.courses);
      setClasses(data.class || data.classes || classes);
    } catch (e) {
      error(e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCourseData();
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
                    <div className="titlenavigate">Home</div>
                    <ChevronRightIcon />{" "}
                    <div className="titlenavigate">
                      {JSON.parse(localStorage.getItem("user", "{}"))?.name}
                    </div>
                  </div>
                  {/* ---start-page end---  */}

                  {/* student page starts  */}
                  <section className="studentpage">
                    <div className="studentdescription">
                      <div className="info">
                        <AccountCircleIcon />

                        <div className="name">
                          <h5>
                            {
                              JSON.parse(localStorage.getItem("user", "{}"))
                                ?.name
                            }
                          </h5>
                          <p>
                            {
                              JSON.parse(localStorage.getItem("user", "{}"))
                                ?.student_number
                            }
                          </p>
                        </div>
                      </div>

                      <div className="studentnavbar">
                        <div className="react-tabs ">
                          <div className="tabpanel">
                            <div className="tabbar">
                              <Overview data={data} cls={myClass?.class} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            ) : null}
            {getCurrentRole() === roles.admin ? (
              <div className="instructorpanel">
                <div>
                  <h2>Welcome to Admin Panel</h2>
                  <hr />
                  <div className="block">{dashboardCounters()}</div>
                </div>
              </div>
            ) : null}
            {getCurrentRole() === roles.instructor ? (
              <div className="instructorpanel">
                <div className="">
                  <h2>Welcome to Teacher Panel</h2>
                  <hr />
                  <div className="block">{dashboardCounters()}</div>
                </div>
              </div>
            ) : null}

            {loading ? (
              <div>
                <hr />
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
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Adminpanel;
