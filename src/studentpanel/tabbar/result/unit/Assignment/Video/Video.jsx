import React from 'react'
import "./video.scss"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ReactPlayer from 'react-player'
import { ASSIGNMENT_QUESTION_IMAGE_PREFIX, SOLUTION_VIDEO_PREFIX, VIDEO_PREFIX } from '../../../../../../constants/url';


const Video = ({ data }) => {


  return (
    <>
      <div className='videobox'>

        <Tabs className="tab">
          <div className="tabbox1">
            {
              data.map((curElem) => {
                return (
                  <TabPanel className="tabpanel" >
                    <ReactPlayer
                      playing={false}
                      controls={true}
                      width="100%"
                      height="400px"
                      url={VIDEO_PREFIX + curElem.video}
                    />
                    <img src={ASSIGNMENT_QUESTION_IMAGE_PREFIX + curElem.image} alt="" />
                  </TabPanel>
                )
              })
            }
          </div>

          <div className="tabbox2">
            <div className="title">
              <h3>Content</h3>
              <p>{data.length}/{data.length}</p>
            </div>

            <TabList className="tabbar">

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