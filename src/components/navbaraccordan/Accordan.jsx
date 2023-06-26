import "./accordan.scss"

import { NavLink, useNavigate } from "react-router-dom";


export const Accordan = () => {

  const navigate=useNavigate();
  const Logout = () => {
      navigate("/")
  };

  return (
    <>
      <div className="accordanbox">
        <h6 className="dropdown-header">Welcome to Admin</h6>
        <li className="profile" onClick={Logout}>
          <NavLink to="/login">Logout</NavLink>
        </li>
      </div>
    </>
  )
}
