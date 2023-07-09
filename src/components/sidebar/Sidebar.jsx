import "./siderbar.scss";

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import AssignmentIcon from '@mui/icons-material/Assignment';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SubjectIcon from '@mui/icons-material/Subject';
import RemoveIcon from '@mui/icons-material/Remove';
import MovieIcon from '@mui/icons-material/Movie';
import ViewListIcon from '@mui/icons-material/ViewList';
import SchoolIcon from '@mui/icons-material/School';
import ClassIcon from '@mui/icons-material/Class';
import DashboardIcon from '@mui/icons-material/Dashboard';

import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { classData } from "../../services/class";
import { getCourses } from "../../services/courses";
import { getCurrentRole, roles } from "../../utils/common";


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
    if (getCurrentRole() !== roles.student) {
      getClass();
      getCourseData();
    }
  }, [])


  const sidebararr = [
    {
      id: "1",
      name: "Users",
      img: <AccountCircleIcon />,
      link: "/dashboard",
      subname1: "Admin",
      subname2: "Learner",
      subname3: "Instructor",
      link2: "/dashboard/learner",
      link3: "/dashboard/instructor",
      display: getCurrentRole() === roles.student ? false : true,
      dropdown: true,
      subname: true

    },
    {
      id: "2",
      name: "Dashboard",
      link: "/dashboard",
      display: getCurrentRole() === roles.student ? true : false,
      dropdown: false,
      icon: <DashboardIcon />,
      subname: true
    },
    {
      id: "3",
      name: "Year List",
      img: <ViewListIcon />,
      subname2: "list",
      subname3: "Unit",
      link2: "/dashboard/course",
      link3: "/dashboard/unit",
      display: getCurrentRole() === roles.student ? false : true,
      dropdown: true,
      subname: false
    },
    {
      id: "4",
      name: "Course",
      img: <SubjectIcon />,
      // subname2: "Course",
      // subname3: "Unit",
      link: "/dashboard/course",
      // link3: "/dashboard/unit",
      display: true,
      dropdown: false,
      subname: true
    },

    {
      id: "5",
      name: "Academic Year",
      link: "/dashboard/classyear",
      subname2: "Course",
      subname3: "Unit",
      icon: <SchoolIcon />,
      display: getCurrentRole() === roles.student ? false : true,
      dropdown: false,
      subname: true
    },

    {
      id: "6",
      name: "Assignment Result",
      link: "/dashboard/result",
      display: getCurrentRole() === roles.student ? true : false,
      dropdown: false,
      icon: <AssignmentIcon />,
      subname: true
    }

  ];


  return (
    <>
      <div>
        <nav className="sidebar">
          <div className="position">
            <div className="logo-title">

              <NavLink to="/dashboard">  <h2><img src="/logo.png" alt="Logo" /></h2></NavLink>
            </div>


            <div className="sidebarbox">
              {sidebararr.filter(bar => bar.display).map((currEle, index) => {

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
                                          courseList.filter((filteredCourse) => filteredCourse.class_id === classElem.id.toString()).map((filteredCourse, index) => {

                                            return (
                                              <>
                                                <Dropdown.Item className="submenu-btn" key={filteredCourse.id} >
                                                  <NavLink to={`/dashboard/course/${filteredCourse.id.toString()}`}><RemoveIcon />  {filteredCourse.course_name} </NavLink></Dropdown.Item>
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
                            <button>{currEle.icon ? currEle.icon : <ClassIcon />} <NavLink to={currEle.link}>{currEle.name}</NavLink></button>
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
