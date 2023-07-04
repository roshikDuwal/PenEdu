import React from 'react'
import Navbar from '../components/panelnavbar/Navbar'
import "./student.scss"
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Overview from './tabbar/overview/Overview';
import StudentCourse from './tabbar/course/StudentCourse';

const Student = () => {
    return (
        <>
            <div className="studentpanel">

                <div className="adminpanelpage">
                    <Navbar data={JSON.parse(localStorage.getItem("user", "{}"))} />

                    {/* -----startpage title---   */}
                    <div className="navigation">
                        <div className='titlenavigate'>Home</div><ChevronRightIcon />  <div className='titlenavigate'>Roshin Lakhemaru</div>
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
                                <Tabs>
                                    <TabList>
                                        <Tab>OverView</Tab>
                                        <Tab>Course</Tab>
                                        <Tab>Result</Tab>
                                    </TabList>

                                    <TabPanel>
                                        <div className='tabbar'>
                                            <Overview/>
                                        </div>

                                    </TabPanel>
                                    <TabPanel>
                                        <div className='tabbar'>
                                            <StudentCourse/>
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <div className='tabbar'>
                                           Result
                                        </div>
                                    </TabPanel>
                                </Tabs>
                            </div>
                        </div>

                    </section>


                </div>
            </div>
        </>
    )
}

export default Student