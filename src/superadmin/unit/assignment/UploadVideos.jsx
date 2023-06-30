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
import { addVideo, getAssignment } from "../../../services/assignments";
import { ASSIGNMENT_QUESTION_IMAGE_PREFIX, VIDEO_PREFIX } from "../../../constants/url";
import { error, success } from "../../../utils/toast";

const UploadVideos = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { id } = useParams();

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
      { Header: "Question", Cell: ({ row }) => <h5>{row.original.title}</h5> },
      {
        Header: "File",
        Cell: ({ row }) => (
          <>
            <div className="que-ans">
              <img
                src={ASSIGNMENT_QUESTION_IMAGE_PREFIX + row.original.image}
                alt={row.original.title}
              />
            </div>
          </>
        ),
      },
      {
        Header: "Video",
        Cell: ({ row }) => {
          const [uploading, setUploading] = useState(false);
          const handleVideoUpload = (e) => {
            setUploading(true);
            const file = e.target.files[0];
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
              var formData = new FormData();
              formData.append("video", file);

              addVideo(row.original.id, formData)
                .then(() => {
                  success("Video uploaded successfully");
                  getData();
                })
                .catch((err) => {
                  error(err.message);
                })
                .finally(() => {
                  setUploading(false);
                });
            };
          };

          return (
            <>
              <div className="actionbox">
                <div className="video">
                  {row.original.video ? (
                    <video src={VIDEO_PREFIX + row.original.video} controls>
                      Your browser does not support the video tag.
                    </video>
                  ) : uploading ? (
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
                  ) : (
                    <input
                      type="file"
                      onChange={handleVideoUpload}
                      accept="video/mp4,video/x-m4v,video/*"
                    />
                  )}
                </div>
              </div>
            </>
          );
        },
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
