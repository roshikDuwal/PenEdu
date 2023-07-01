import "./accordan.scss"

import { NavLink, useNavigate } from "react-router-dom";


export const Accordan = ({data}) => {

  const navigate=useNavigate();
  const Logout = () => {
      navigate("/")
  };

  return (
    <>
      <div className="accordanbox">
        <h6 className="dropdown-header">{data.name}</h6>
        <li className="profile" onClick={Logout}>
          <NavLink to="/login">Logout</NavLink>
        </li>
      </div>
    </>
  )
}
