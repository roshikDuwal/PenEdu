import { Navbar } from "react-bootstrap"
import Sidebar from "../components/sidebar/Sidebar"
import { NavLink } from "react-router-dom"
import ChevronRightIcon from "@mui/icons-material/ChevronRight";


const Check = () => {
  return (
    <>
      <div className="studentpanel">
        <Sidebar />

        <div className="adminpanelpage">
          <Navbar data={JSON.parse(localStorage.getItem("user", "{}"))} />

          {/* -----startpage title---   */}
          <div className="snavigation">
          <NavLink to="/dashboard">Dashboard</NavLink> <ChevronRightIcon />{" "}
           <NavLink to="#">Check</NavLink>
          </div>
          {/* ---start-page end---  */}

          <div className="learner-box">
            <div className="learner-list">
              <div className="modal-btn">
                <h4>Check Assignment</h4>
                {/* <h6>({course})</h6> */}
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Check