import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./home.scss";
import Herosection from "../../components/herosection/Herosection";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user", "{}"))?.token;
    if (token) {
      navigate("/dashboard");
    }
  }, []);
  const data = {
    name: "Better Education",
    description:
      "PEN Clinic targets your weakness , directing your time and energy into specialised practice to achieve academic success",
    image: "/hero.jpg",
    button: "Contact Us",
  };
  return (
    <>
      <nav className="homenav">
        <div className="logo">
          <img src="/logo.png" alt="" />
        </div>
        <div className="navbar">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>Course</li>
            <li>About Us</li>
            <li>
              <div className="right-menu">
                <li className="menu-button"> Login <ArrowDropDownIcon /></li>
                <ul className="dropdown-menu " >
                  <div className="grid-container">
                    <div className="grid-item">
                      <button className="submenu-button ">
                        <NavLink to={"/admin/login"}>Admin</NavLink>
                      </button>
                    </div>
                    <div className="grid-item">
                      <button className="submenu-button ">
                        <NavLink to={"/student/login"}>Student </NavLink>
                      </button>
                    </div>

                    <div className="grid-item">
                      <button className="submenu-button" >
                        <NavLink to="/teacher/login">Teacher </NavLink>
                      </button>
                    </div>

                  </div>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </nav>

      <Herosection data={data} />
    </>
  );
};

export default Home;
