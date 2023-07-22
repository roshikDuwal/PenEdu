import React, { useEffect, useState } from 'react'
import "./video.scss"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ReactPlayer from 'react-player'
import { ASSIGNMENT_QUESTION_IMAGE_PREFIX, SOLUTION_VIDEO_PREFIX, VIDEO_PREFIX } from '../../../../../../constants/url';


const Video = ({ data, alldata }) => {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const divElement = document.getElementById('your-div-id');
      if (divElement) {
        const rect = divElement.getBoundingClientRect();
        const shouldFix = rect.top <= 0;
        setIsFixed(shouldFix);
      }
    };

    // Add the event listener to handleScroll when component mounts
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);




  return (
    <>
      <div className='videobox'>

        <Tabs className="tab">
          <div className="tabbox1">
            {
              data.map((curElem) => {
                return (
                  <TabPanel className="tabpanel" >

                    {/* <ReactPlayer
                      playing={false}
                      controls={true}
                      width="100%"
                      height="50%"
                      url={VIDEO_PREFIX + curElem.video}
                    /> */}

                    <div className="Videobox">
                      <iframe allowFullScreen={true} webkitallowfullscreen="true" mozallowfullscreen="true" src={curElem.video} allow="autoplay"></iframe>
                    </div>

                    <hr />

                    <div className='answer'>
                      <h4>Answer</h4>
                      {/* <p>Total Marks:11</p>
                      <p>Obtained Marks:qq</p> */}

                    </div>
                    {/* <div className="feedback">
                      <h5>Feedback:</h5> <p></p>
                    </div> */}


                    <div className="imagebox">
                      <img src={ASSIGNMENT_QUESTION_IMAGE_PREFIX + curElem.image} alt="" />
                      <br />
                    </div>

                  </TabPanel>
                )
              })
            }
          </div>


          <div id="your-div-id" className=' tabbox2' style={{ position: isFixed ? 'fixed' : 'static', width: isFixed ? "16.8%" : "20%" }} >
            <div className="title">
              <h3>Content</h3>
              <p>{data.length}/{data.length}</p>
            </div>

            <TabList
              className="tabbar">

              {
                data.map((curElem) => {
                  return (
                    <>
                      <Tab>
                        <form action="">
                          <input type="checkbox" name="" id="" />
                        </form>
                        {curElem.title}
                      </Tab>
                    </>
                  )
                })
              }
            </TabList>
          </div>


        </Tabs>
      </div>

    </>
  )
}

export default Video