import "./siderbar.scss";

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SubjectIcon from '@mui/icons-material/Subject';
import RemoveIcon from '@mui/icons-material/Remove';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ClassIcon from '@mui/icons-material/Class';

import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { classData } from "../../services/class";
import { getCourses } from "../../services/courses";

const Sidebar = () => {

  const [classList, setClassList] = useState([])
  const [courseList, setCourseList] = useState([])

  //getClass
  const getClass = async () => {
    classData()
      .then(classdata => {
        setClassList(classdata)
      })
  }

  //getCourse
  const getCourseData = async () => {
    const data = await getCourses();
    setCourseList(data.course);
  };

  useEffect(() => {

  }, []);

  useEffect(() => {
    getClass();
    getCourseData();
  }, [])


  const sidebararr = [
    {
      id: "1",
      name: "Users",
      img: <AccountCircleIcon />,
      link: "/admin",
      subname1: "Admin",
      subname2: "Learner",
      subname3: "Instructor",
      link2: "/admin/learner",
      link3: "/admin/instructor",
      display: true,
      dropdown: true,
      subname: true

    },
    {
      id: "2",
      name: "Year List",
      img: <SubjectIcon />,
      subname2: "list",
      subname3: "Unit",
      link2: "/admin/course",
      link3: "/admin/unit",
      display: false,
      dropdown: true,
      subname: false
    },
    {
      id: "3",
      name: "Course",
      img: <SubjectIcon />,
      subname2: "Course",
      subname3: "Unit",
      link2: "/admin/course",
      link3: "/admin/unit",
      display: false,
      dropdown: true,
      subname: true
    },
    {
      id: "4",
      name: "Class Year",
      link: "/admin/classyear",
      subname2: "Course",
      subname3: "Unit",
      display: false,
      dropdown: false,
      subname: true
    }

  ];


  return (
    <>
      <div>
        <nav className="sidebar">
          <div className="position">
            <div className="logo-title">
              {/* <img src="/logo.png" alt="Logo" /> */}
              <h2>Logo</h2>
            </div>


            <div className="sidebarbox">
              {sidebararr.map((currEle, index) => {

                return (
                  <div className="box" key={currEle.id}>

                    {
                      currEle.dropdown == true ?
                        <>
                          <Dropdown >
                            <Dropdown.Toggle id="dropdown-basic">
                              {currEle.img}{currEle.name}
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="dropdown-menu dropdownmenu" >


                              {currEle.subname == true ? <>
                                <Dropdown.Item className="menu" > <NavLink to={currEle.link2}><RemoveIcon /> {currEle.subname2}</NavLink></Dropdown.Item>
                                <Dropdown.Item className="menu"><NavLink to={currEle.link3}><RemoveIcon /> {currEle.subname3}</NavLink></Dropdown.Item>
                              </>
                                :
                                <>
                                  {classList.map((classElem, index) => {

                                
                                    return (
                                      <DropdownButton className="dropdownbtn" id="dropdown-basic-button" title={classElem.class} key={index}>
                                        { 
                                      
                                        //  courseList.filter((courseElem) => courseElem.class_id === classElem.id).map((filteredCourse,index)=>{
                                          courseList.map((filteredCourse,index)=>{
                                          console.log(filteredCourse);
                                            return (
                                              <>
                                                <Dropdown.Item className="submenu-btn" href="#" key={filteredCourse.id} > <FiberManualRecordIcon /> {filteredCourse.course_name} </Dropdown.Item>

                                              </>
                                            )
                                            
                                          })
                                        }
                                      </DropdownButton>
                                    )
                                  })}
                                </>}
                            </Dropdown.Menu>

                          </Dropdown>
                        </>
                        :
                        <>
                          <div className="dropdown">
                            <button><ClassIcon /> <NavLink to={currEle.link}>{currEle.name}</NavLink></button>
                          </div>
                        </>
                    }


                  </div>
                );
              })}
            </div>
          </div>


        </nav>
      </div>
    </>

  );
};

export default Sidebar;
