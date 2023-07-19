import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "../admin.scss";
import "./course.scss";
import Select from "react-select";
import Navbar from "../../components/panelnavbar/Navbar";
import CustomReactTable from "../../components/CustomReactTable/CustomReactTable";

import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { useFormik } from "formik";
import { NavLink } from "react-router-dom";

import { Accordan } from "../../components/tableaccordan/Accordan";
import {
  addCourses,
  deleteCourseData,
  getCourses,
  getCoursesByClass,
} from "../../services/courses";
import { addCourseSchema } from "../../schema/validate";
import { error, success } from "../../utils/toast";
import { getCurrentRole, roles } from "../../utils/common";
import { classData } from "../../services/class";

const Course = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [data, setData] = useState([]);
  const [classes, setClasses] = useState([]);
  const [myClass, setMyClass] = useState(null);

  const handleClose = () => {
    resetForm();
    setOpen(false);
  };

  const [openAccordan, setOpenAccordan] = useState(null);

  const getCourseData = async () => {
    setLoading(true);
    try {
      const classes = await classData();
      let data;
      if (getCurrentRole() !== roles.admin) {
        const cls = classes[0];
        setMyClass(cls);
        data = await getCoursesByClass(cls.id);
      } else {
        data = await getCourses();
      }
      setData(data.course || data.courses);
      setClasses(
        classes.map((data) => {
          return { label: data.class, value: data.id };
        })
      );
    } catch (e) {
      error(e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCourseData();
  }, []);

  const columns = React.useMemo(
    () => [
      // { Header: "Course Id", accessor: "id" },
      { Header: "Course Name", accessor: "course_name" },
      { Header: "Course Code", accessor: "course_code" },
      { Header: "Credit hours", accessor: "credit_hours" },
      {
        Header: "Academic Year",
        Cell: ({ row }) =>
          classes.length && row.original.class_id
            ? classes.find(
                (cls) => cls.value.toString() === row.original.class_id
              ).label
            : "",
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <>
            <div className="actionbox">
              <div className="update">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenAccordan(row.original.id);
                  }}
                >
                  <MoreHorizIcon />
                </button>

                {openAccordan === row.original.id && (
                  <Accordan
                    setOpenAccordan={setOpenAccordan}
                    handleDelete={async () => {
                      try {
                        setLoading(true);
                        await deleteCourseData(row.original.id);
                        success("Course deleted successfully!");
                        getCourseData();
                      } catch (e) {
                        error(e.message || "Failed to delete course!");
                      }
                    }}
                  />
                )}
              </div>
            </div>
          </>
        ),
      },
    ],
    [openAccordan, classes]
  );

  const Values = {
    course_name: "",
    course_code: "",
    class_id: "",
    credit_hours: 0,
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
    validationSchema: addCourseSchema,
    initialValues: Values,
    onSubmit: async (values, action) => {
      try {
        await addCourses({
          ...values,
          credit_hours: values.credit_hours.toString(),
        });
        success("Course added successfully!");
        action.resetForm();
        getCourseData();
        handleClose();
      } catch (e) {
        error(e.message || "Failed to add course!");
      }
    },
  });

  return (
    <div className="adminpanel">
      <Sidebar />
      <div className="adminpanelpage">
        <Navbar data={JSON.parse(localStorage.getItem("user", "{}"))} />
        <div className="learner-box">
          <div className="navigation">
            <NavLink to="/dashboard">Dashboard</NavLink> <ChevronRightIcon />{" "}
            <p>Courses</p>
          </div>

          <div className="learner-list-box">
            <div className="modal-btn">
              <h4>{myClass?.class}</h4>
              <h6>Courses</h6>
              {getCurrentRole() === roles.admin ? (
                <Button onClick={handleOpen}>
                  <AddIcon /> Add Course
                </Button>
              ) : null}
            </div>

            <Modal
              className="coursemodal"
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="modal-box ">
                <div className="create-detail">
                  <p>Create Course</p>
                  <Button className="closequestionicon" onClick={handleClose}>
                    <CloseIcon />
                  </Button>
                </div>

                <form onSubmit={handleSubmit} className="instructor-form">
                  <div className="formbox">
                    <label htmlFor="course_name">Name</label>
                    <input
                      type="text"
                      name="course_name"
                      value={values.course_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.course_name && touched.course_name ? (
                      <p className="errorval">{errors.course_name}</p>
                    ) : null}
                  </div>

                  <div className="formbox">
                    <label htmlFor="course_code">Course Code</label>
                    <input
                      type="text"
                      name="course_code"
                      value={values.course_code}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.course_code && touched.course_code ? (
                      <p className="errorval">{errors.course_code}</p>
                    ) : null}
                  </div>

                  <div className="formbox">
                    <label htmlFor="class">Class</label>
                    <Select
                      name="class"
                      value={
                        classes.length && values.class_id
                          ? classes.find((cls) => cls.id === values.class_id)
                          : ""
                      }
                      options={classes}
                      onChange={(e) => setFieldValue("class_id", e.value)}
                      onBlur={handleBlur}
                    />
                    {errors.class_id && touched.class_id ? (
                      <p className="errorval">{errors.class_id}</p>
                    ) : null}
                  </div>

                  <div className="formbox">
                    <label htmlFor="credit_hours">Credit Hours</label>
                    <input
                      type="number"
                      name="credit_hours"
                      value={values.credit_hours}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.credit_hours && touched.credit_hours ? (
                      <p className="errorval">{errors.credit_hours}</p>
                    ) : null}
                  </div>

                  <div className="submitbtn">
                    <button disabled={isSubmitting} type="submit">
                      <AddIcon /> Create
                    </button>
                  </div>
                </form>
              </Box>
            </Modal>
            <CustomReactTable
              columns={columns}
              data={data}
              loading={loading}
              rowClickable={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
