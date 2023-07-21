import React, { useEffect, useState } from "react";
import "./video.scss";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ReactPlayer from "react-player";
import {
  ASSIGNMENT_QUESTION_IMAGE_PREFIX,
  SOLUTION_VIDEO_PREFIX,
  VIDEO_PREFIX,
} from "../../../../constants/url";

const Video = ({ singleChecks }) => {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const divElement = document.getElementById("your-div-id");
      if (divElement) {
        const rect = divElement.getBoundingClientRect();
        const shouldFix = rect.top <= 0;
        setIsFixed(shouldFix);
      }
    };

    // Add the event listener to handleScroll when component mounts
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="videopanel">
        <div className="adminpanelpage">
          <section className="studentpage">
            <div className="studentdescription">
              <div className="tabbar">
                <div className="studentnavbar">
                  <div className="videobox">
                    <Tabs className="tab">
                      <div className="tabbox1">
                        {singleChecks.map((curElem, i) => {
                          return (
                            <TabPanel key={i} className="tabpanel">
                              {/* <ReactPlayer
                      playing={false}
                      controls={true}
                      width="100%"
                      height="50%"
                      url={VIDEO_PREFIX + curElem.video}
                    /> */}

                              <div className="Videobox">
                                <iframe
                                  allowFullScreen={true}
                                  webkitallowfullscreen="true"
                                  mozallowfullscreen="true"
                                  src={curElem.single_questions?.video}
                                  allow="autoplay"
                                ></iframe>
                              </div>

                              <hr />

                              <div className="answer">
                                <h4>{curElem?.single_questions?.title}</h4>
                              </div>
                              <div className="answer">
                                <p>Total Marks:{curElem.single_questions?.score}</p>
                                <p>Obtained Marks:{curElem.marks}</p>
                              </div>
                              <div className="feedback">
                                <h5>Feedback:{curElem.feedback}</h5>
                              </div>

                              <div className="imagebox">
                                <img
                                  src={
                                    ASSIGNMENT_QUESTION_IMAGE_PREFIX +
                                    curElem?.single_questions?.image
                                  }
                                  alt=""
                                />
                                <br />
                              </div>
                            </TabPanel>
                          );
                        })}
                      </div>

                      <div
                        id="your-div-id"
                        className="tabbox2"
                        style={{
                          position: "static",
                          width: "20%",
                        }}
                      >
                        <div className="title">
                          <h3>Content</h3>
                          <p>
                            {singleChecks.length}/{singleChecks.length}
                          </p>
                        </div>

                        <TabList className="tabbar">
                          {singleChecks.map((curElem) => {
                            return (
                              <>
                                <Tab>
                                  <form action="">
                                    <input type="checkbox" name="" id="" />
                                  </form>
                                  {curElem?.single_questions?.title}
                                </Tab>
                              </>
                            );
                          })}
                        </TabList>
                      </div>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Video;
