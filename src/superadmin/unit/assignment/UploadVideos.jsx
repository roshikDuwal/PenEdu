import React, { useEffect, useState } from "react";
import { useParams, Link, NavLink } from "react-router-dom";

import "./addassignment.scss";
import Button from "@mui/material/Button";
import { ThreeDots } from "react-loader-spinner";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Navbar from "../../../components/panelnavbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import { CancelOutlined } from "@mui/icons-material";
import CustomReactTable from "../../../components/CustomReactTable/CustomReactTable";
import { getAssignment } from "../../../services/assignments";
import { ASSIGNMENT_QUESTION_IMAGE_PREFIX } from "../../../constants/url";

const UploadVideos = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const {id} = useParams();

  const getData = async () => {
    setLoading(true);
    const data = await getAssignment(id);
    setData(data.unitAssignmentQuestions);

    setLoading(false);
    };

    useEffect(() => {
        getData();
    }, []);

  const columns = React.useMemo(
    () => [
      { Header: "Question", Cell: ({ row }) => (
        <h5>{row.original.title}</h5>
      ) },
      {
        Header: "File",
        Cell: ({ row }) => (
          <>
            <div className="que-ans">
              <img src={ASSIGNMENT_QUESTION_IMAGE_PREFIX + row.original.image} alt={row.original.title} />
            </div>
          </>
        ),
      },
      {
        Header: "Video",
        Cell: ({ row }) => (
          <>
            <div className="actionbox">
              <div className="video">
                {row.original.video ? (
                  <video src={row.original.video} controls>Your browser does not support the video tag.</video>
                ) : (
                  <input type="file" />
                )}
              </div>
            </div>
          </>
        ),
      },
    ],
    []
  );

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
                <NavLink to="./..">
                  <Button>
                    <CancelOutlined /> Cancel
                  </Button>
                </NavLink>
              </div>
              <CustomReactTable
                columns={columns}
                data={data}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadVideos;
