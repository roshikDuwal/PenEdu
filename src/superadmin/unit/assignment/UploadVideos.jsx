import React, { useEffect, useState } from "react";
import { useParams, Link, NavLink } from "react-router-dom";

import "./addassignment.scss";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import Button from "@mui/material/Button";
import { ThreeDots } from "react-loader-spinner";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Navbar from "../../../components/panelnavbar/Navbar";
import AddIcon from "@mui/icons-material/Add";
import Sidebar from "../../../components/sidebar/Sidebar";
import { CancelOutlined } from "@mui/icons-material";
import CustomReactTable from "../../../components/CustomReactTable/CustomReactTable";
import {
  addVideo,
  deleteQuestion,
  getAssignment,
  getAssignments,
  saveQuestion,
  updateQuestion,
} from "../../../services/assignments";
import {
  ASSIGNMENT_IMAGE_PREFIX,
  ASSIGNMENT_QUESTION_IMAGE_PREFIX,
} from "../../../constants/url";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import { error, success } from "../../../utils/toast";
import ReactPlayer from "react-player";
import { getCurrentRole, roles } from "../../../utils/common";
import SCanva from "./scanva/DoCanva";
import { useFormik } from "formik";
import { addQuestionSchema } from "../../../schema/validate";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import { Accordan } from "../../../components/tableaccordan/Accordan";
import UpdateAssignment from "./UpdateAssignment";

import ReactFancyBox from 'react-fancybox'
import 'react-fancybox/lib/fancybox.css'

const UploadVideos = () => {
  const [loading, setLoading] = useState(false);
  const [assignment, setAssignment] = useState([]);
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = useState(null);
  const { id, unit_id } = useParams();
  const [openAccordan, setOpenAccordan] = useState(null);

  const Values = {
    unit_assignment_id: id,
    title: "",
    score: null,
    file: "",
    video: "",
  };
  const [editData, setEditData] = useState(Values);

  const handleEdit = (data) => {
    setEditData(data);
    setOpenAccordan(null);
    setOpen(true);
  };

  const handleClose = () => {
    resetForm();
    setEditData(null);
    setOpen(false);
    setFile(null);
  };
  const handleOpen = () => setOpen(true);

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    const f = await blobToBase64(URL.createObjectURL(file));
    setFile(f);
  };

  const blobToBase64 = async (url) => {
    return new Promise((resolve, _) => {
      var img = new Image();
      img.src = url;
      img.onload = () => {
        var myCanvas = document.createElement("canvas");
        var ctx = myCanvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        resolve(myCanvas.toDataURL());
      };
    });
  };

  const {
    values,
    errors,
    setFieldValue,
    handleBlur,
    resetForm,
    handleChange,
    touched,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    validationSchema: addQuestionSchema,
    initialValues: editData || Values,
    enableReinitialize: true,
    onSubmit: async (values, action) => {
      try {
        if (editData?.id) {
          const data = {
            ...values,
            file: values.image,
            score: values.score.toString(),
          };
          if (file) {
            data.file = file;
          } else {
            delete data.file;
          }
          await updateQuestion(editData?.id, data);
        } else {
          if (!file) {
            return;
          }
          await saveQuestion({
            ...values,
            file,
            score: values.score.toString(),
          });
        }
        success("Success!");
        action.resetForm();
        getData();
        handleClose();
      } catch (e) {
        error(e.message || "Failed!");
      }
    },
  });

  const getData = async () => {
    setLoading(true);
    if (getCurrentRole() !== roles.student) {
      const data = await getAssignment(id);
      setData(data.unitAssignmentQuestions);
    }
    const assignmentData = await getAssignments(unit_id);
    const assignments =
      assignmentData.unitAssignment || assignmentData.unitAssignments;
    setAssignment(assignments.find((as) => as.id.toString() === id));

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
              {/* <img
                src={ASSIGNMENT_QUESTION_IMAGE_PREFIX + row.original.image}
                alt={row.original.title}
              /> */}

              <ReactFancyBox
                thumbnail={ASSIGNMENT_QUESTION_IMAGE_PREFIX + row.original.image}
                image={ASSIGNMENT_QUESTION_IMAGE_PREFIX + row.original.image}
              />
            </div>
          </>
        ),
      },
      {
        Header: "Score",
        Cell: ({ row }) => <h5>{row.original.score}</h5>,
      },

      {
        Header: "Video Url",
        Cell: ({ row }) => {
          const [uploading, setUploading] = useState(false);
          const [videoUrl, setVideoUrl] = useState("");

          const handleVideoUrlUpload = (e) => {
            setVideoUrl(e.target.value);
          };

          const handleSubmit = (e) => {
            setUploading(true);

            var formData = new FormData();
            formData.append("video", videoUrl);

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

          return (
            <>
              <div className="actionbox">
                <div className="video">
                  {row.original.video ? (
                    // <video src={ row.original.video} controls>
                    //   Your browser does not support the video tag.
                    // </video>
                    <ReactPlayer controls={true} url={row.original.video} />
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
                    <>
                      <form action="" onSubmit={handleSubmit}>
                        <input
                          type="text"
                          onChange={handleVideoUrlUpload}
                          placeholder="Enter video url"
                          style={{ padding: "0.5rem", fontSize: "0.81rem" }}
                          required
                        />
                        <button type="submit">Upload</button>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </>
          );
        },
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <>
            <div className="actionbox">
              <div className="update">
                <button onClick={() => setOpenAccordan(row.original.id)}>
                  <MoreHorizIcon />
                </button>

                {openAccordan === row.original.id && (
                  <Accordan
                    handleEdit={() => handleEdit(row.original)}
                    handleDelete={async () => {
                      try {
                        setLoading(true);
                        await deleteQuestion(row.original.id)
                        success("Question deleted successfully!");
                        getData()
                      } catch (e) {
                        error(e.message || "Failed to delete question!");
                      }
                    }}
                    setOpenAccordan={setOpenAccordan}
                  />
                )}
              </div>
            </div>
          </>
        ),
      },
      // {
      //   Header: "Video",
      //   Cell: ({ row }) => {
      //     const [uploading, setUploading] = useState(false);
      //     const handleVideoUpload = (e) => {
      //       setUploading(true);
      //       const file = e.target.files[0];
      //       var reader = new FileReader();
      //       reader.readAsDataURL(file);
      //       reader.onload = function () {
      //         var formData = new FormData();
      //         formData.append("video", file);

      //         addVideo(row.original.id, formData)
      //           .then(() => {
      //             success("Video uploaded successfully");
      //             getData();
      //           })
      //           .catch((err) => {
      //             error(err.message);
      //           })
      //           .finally(() => {
      //             setUploading(false);
      //           });
      //       };
      //     };

      //     return (
      //       <>
      //         <div className="actionbox">
      //           <div className="video">

      //             {row.original.video ? (
      //               <video src={VIDEO_PREFIX + row.original.video} controls>
      //                 Your browser does not support the video tag.
      //               </video>
      //             ) : uploading ? (
      //               <ThreeDots
      //                 height="80"
      //                 width="80"
      //                 radius="9"
      //                 color="#0AB39C"
      //                 ariaLabel="three-dots-loading"
      //                 wrapperStyle={{}}
      //                 wrapperClassName=""
      //                 visible={true}
      //               />
      //             ) : (
      //               <>

      //                 <input
      //                   type="file"
      //                   onChange={handleVideoUpload}
      //                   accept="video/mp4,video/x-m4v,video/*"
      //                 />
      //               </>

      //             )}
      //           </div>
      //         </div>
      //       </>
      //     );
      //   },
      // },
    ],
    [openAccordan]
  );
  const title =
    getCurrentRole() === roles.student ? "Do Assignment" : "Assignment Details";
  const [page, setPage] = useState(0);

  const PageDisplay = () => {
    if (page === 0) {
      return (
        <div>
          <UpdateAssignment assignment={assignment} getData={getData} />
        </div>
      );
    }
    if (page === 1) {
      return (
        <div>
          <Button className="addindividualques" onClick={handleOpen}>
            <AddIcon />
            Add Question
          </Button>

          <Modal
            className="unitmodal"
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="modal-box ">
              <div className="create-detail">
                <p>{editData?.id ? "Edit" : "Add"} Question</p>
                <Button className="closequestionicon" onClick={handleClose}>
                  <CloseIcon />
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="instructor-form">
                <div className="formbox">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.title && touched.title ? (
                    <p className="errorval">{errors.title}</p>
                  ) : null}
                </div>

                <div className="formbox">
                  <label htmlFor="score">Score</label>
                  <input
                    type="number"
                    name="score"
                    value={values.score}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.score && touched.score ? (
                    <p className="errorval">{errors.score}</p>
                  ) : null}
                </div>

                <div className="formbox">
                  <label htmlFor="credit_hours">File</label>
                  <input
                    type="file"
                    name="file"
                    value={values.file}
                    onChange={(e) => {
                      uploadFile(e);
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                  />
                  {!file && touched.file ? (
                    <p className="errorval">Please add file</p>
                  ) : null}
                </div>

                <div className="formbox">
                  <label htmlFor="video">Video URL</label>
                  <input
                    type="text"
                    name="video"
                    value={values.video}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.video && touched.video ? (
                    <p className="errorval">{errors.video}</p>
                  ) : null}
                </div>

                <div className="submitbtn">
                  {editData?.id ? (
                    <button disabled={isSubmitting} type="submit">
                      <AddIcon /> Update
                    </button>
                  ) : (
                    <button disabled={isSubmitting} type="submit">
                      <AddIcon /> Add
                    </button>
                  )}
                </div>
              </form>
            </Box>
          </Modal>

          <CustomReactTable columns={columns} data={data} loading={loading} />
        </div>
      );
    }
  };

  return (
    <>
      <div className="adminpanel">
        <Sidebar />
        <div className="adminpanelpage">
          <Navbar data={JSON.parse(localStorage.getItem("user", "{}"))} />
          <div className="learner-box">
            <div className="navigation">
              <NavLink to="/dashboard">Dashboard</NavLink> <ChevronRightIcon />
              <NavLink to="./../../..">Courses</NavLink> <ChevronRightIcon />
              <NavLink to="./../..">Units</NavLink> <ChevronRightIcon />
              <NavLink to="./..">Assignments</NavLink>
              <ChevronRightIcon /> <p>{title}</p>
            </div>

            <div className="learner-list-box">
              <div className="modal-btn">
                <h4>{assignment.title}</h4>
                <h6>{title}</h6>
                <NavLink to="./..">
                  <Button>
                    <CancelOutlined /> Cancel
                  </Button>
                </NavLink>
              </div>
              {getCurrentRole() === roles.student ? (
                <>
                  <SCanva {...assignment} />
                </>
              ) : (
                <>
                  <div className="flex-box m-4">
                    <div className="flex">
                      <button
                        disabled={page == 0}
                        onClick={() => {
                          setPage((currPage) => currPage - 1);
                          handleClose();
                        }}
                        className="form-control"
                      >
                        <PictureAsPdfIcon />
                        Assignment PDF
                      </button>
                      <button
                        disabled={page === 1}
                        onClick={() => {
                          setPage((currPage) => currPage + 1);
                        }}
                        className="form-control mt-2"
                      >
                        <BackupTableIcon />
                        Individual Question/Answer
                      </button>
                    </div>
                  </div>
                  <div className="page">
                    <div>{PageDisplay()}</div>
                  </div>
                </>
              )}
              {loading ? (
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
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadVideos;
