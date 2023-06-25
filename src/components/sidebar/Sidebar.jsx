import "./siderbar.scss";

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SubjectIcon from '@mui/icons-material/Subject';
import RemoveIcon from '@mui/icons-material/Remove';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const Sidebar = () => {
  const sidebararr = [
    {
      id: "1",
      name: "Users",
      link: "/dashboard/userlist",
      img: <AccountCircleIcon />,
      subname1: "Admin",
      subname2: "Learner",
      subname3: "Instructor",
      display: true

    },
    {
      id: "2",
      name: "Course",
      link: "/dashboard/productlist",
      img: <SubjectIcon />,
      subname2: "Course",
      subname3: "Unit",
      display: false
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
                    <Dropdown  >
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

                        <Dropdown.Item className="menu" href="/admin/learner"><RemoveIcon /> {currEle.subname2}</Dropdown.Item>
                        <Dropdown.Item className="menu" href="/admin/unit"> <RemoveIcon /> {currEle.subname3}</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
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
