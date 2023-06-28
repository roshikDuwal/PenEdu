import React, { useEffect, useState } from "react";
import { useParams, Link, NavLink } from "react-router-dom";

import './addassignment.scss';
import Button from '@mui/material/Button';
import { ThreeDots } from "react-loader-spinner";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Navbar from "../../../components/panelnavbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import { CancelOutlined } from "@mui/icons-material";

const UploadVideos = () => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className="adminpanel">
        <Sidebar />
        <div className="adminpanelpage">
          <Navbar />
          <div className="learner-box">
            <div className="navigation">
              <NavLink to="/admin">Admin</NavLink> <ChevronRightIcon />{" "}
              <NavLink to="/admin/unit">Units</NavLink> <ChevronRightIcon />{" "}
              <NavLink to="./..">Assignments</NavLink> <ChevronRightIcon />{" "}
              <p>Upload Videos</p>
            </div>

            <div className="learner-list-box">
              <div className="modal-btn">
                <h5>Upload Videos</h5>
                <NavLink to="./.."><Button><CancelOutlined /> Cancel</Button></NavLink>
              </div>
              {loading && (
                <ThreeDots
                  height="80"
                  width="80"
                  radius="9"
                  color="#0AB39C"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadVideos;
