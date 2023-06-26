import "./siderbar.scss";

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SubjectIcon from '@mui/icons-material/Subject';
import RemoveIcon from '@mui/icons-material/Remove';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ClassIcon from '@mui/icons-material/Class';

import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const sidebararr = [
    {
      id: "1",
      name: "Users",
      img: <AccountCircleIcon />,
      subname1: "Admin",
      subname2: "Learner",
      subname3: "Instructor",
      link2:"/admin/learner",
      link3:"/admin/instructor",
      display: true,
      dropdown: true

    },
    {
      id: "2",
      name: "Course",
      img: <SubjectIcon />,
      subname2: "Course",
      subname3: "Unit",
      link3:"/admin/unit",
      display: false,
      dropdown: true
    },
    {
      id: "3",
      name: "Class Year",
      link:"/admin/classyear",
      subname2: "Course",
      subname3: "Unit",
      display: false,
      dropdown: false
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

                              {currEle.display === true && <>
                                <DropdownButton className="dropdownbtn" id="dropdown-basic-button" title={currEle.subname1}>
                                  <Dropdown.Item className="submenu-btn" href="#/action-1"> <FiberManualRecordIcon /> Action</Dropdown.Item>
                                  <Dropdown.Item className="submenu-btn" href="#/action-2"> <FiberManualRecordIcon />  Another action</Dropdown.Item>
                                  <Dropdown.Item className="submenu-btn" href="#/action-3"> <FiberManualRecordIcon /> Something else</Dropdown.Item>
                                </DropdownButton>
                              </>}

                              <Dropdown.Item className="menu" > <NavLink to={currEle.link2}><RemoveIcon /> {currEle.subname2}</NavLink></Dropdown.Item>
                              <Dropdown.Item className="menu"><NavLink to={currEle.link3}><RemoveIcon /> {currEle.subname3}</NavLink></Dropdown.Item>

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
