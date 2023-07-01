import React, { useEffect, useState } from "react";
import Canva from "./Canva/SCanva";

import "../../../../student.scss";
import Navbar from "../../../../../components/panelnavbar/Navbar";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Overview from "../../../overview/Overview";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { NavLink, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { getAssignments } from "../../../../../services/assignments";
import { ThreeDots } from "react-loader-spinner";

const ShowAssignment = () => {
  const [loading, setLoading] = useState(true);
  const [assignment, setAssignment] = useState([]);
  const { unit_id, id } = useParams();

  const getData = async () => {
    setLoading(true);
    const data = await getAssignments(unit_id);
    setAssignment(data.unitAssignment.find((as) => as.id.toString() === id));

    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const data = {
    name: "Roshin Lakhemaru",
  };

  return (
    <>
      <div className="studentpanel">
        <div className="adminpanelpage">
          <Navbar data={data} />

          {/* -----startpage title---   */}
          <div className="navigation">
            <div className="titlenavigate">Home</div>
            <ChevronRightIcon />{" "}
            <div className="titlenavigate">Roshin Lakhemaru</div>
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
                <Tabs defaultIndex={1}>
                  <TabList>
                    <Tab> OverView</Tab>
                    <Tab>Assignment</Tab>
                    <Tab>Result</Tab>
                  </TabList>

                  <TabPanel>
                    <div className="tabbar">
                      <Overview />
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div className="tabbar">
                      <NavLink to="/student/unit/2">
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
                        <Canva {...assignment} />
                      )}
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div className="tabbar">Result</div>
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

export default ShowAssignment;
