import "./accordan.scss"

import { NavLink, useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';

import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';

export const Accordan = ({setOpenAccordan}) => {

  const navigate=useNavigate();
  const Logout = () => {
      navigate("/")
  };

  return (
    <>
      <div className="tableaccordanbox">
        <div className="btnbox">
        <button className="accordanbtn" onClick={()=>setOpenAccordan(null)}><CloseIcon/></button>
        </div>

        <li className="profile" onClick={Logout}>
          <NavLink to="#"> <VisibilityIcon/> View</NavLink>
        </li>
        <li className="profile" onClick={Logout}>
          <NavLink to="/login"><DeleteIcon/> Delete</NavLink>
        </li>
        <li className="profile" onClick={Logout}>
          <NavLink to="/login"> <CreateIcon/> Edit</NavLink>
        </li>
      </div>
    </>
  )
}
