import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "../admin.scss";
import "./instructor.scss";
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

import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Accordan } from "../../components/tableaccordan/Accordan";
import {
  addInstructors,
  deleteInstructorData,
  getInstructors,
} from "../../services/instructors";

import Select from "react-select";
import { getCourses } from "../../services/courses";
import { error, success } from "../../utils/toast";
import { addTeacherSchema } from "../../schema/validate";
import { CountriesData } from "../../constants/countires";

const Learner = () => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    resetForm();
    setClasses([]);
    setCourses([]);
    setOpen(false);
  };
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const handleOpen = () => {
    if(!classData.length) {
      error("No class data. Add a class first!");
      return;
    }
    setOpen(true);
  };

  const [openAccordan, setOpenAccordan] = useState(null);
  const [coursedata, setCourseData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [classData, setClassData] = useState([]);
  const [classes, setClasses] = useState([]);

  const onClassChange = (e) => {
    setClasses([e]);
    setCourses([]);
  };

  const onCourseChange = (e) => {
    setCourses([e]);
  };

  const columns = React.useMemo(
    () => [
      { Header: "Instructor Id", accessor: "id" },
      { Header: "Instructor Name", accessor: "name" },
      // { Header: "Course", accessor: "course_id" },
      { Header: "Email", accessor: "email" },
      { Header: "Contact", accessor: "mobile" },

      {
        Header: "Status",
        Cell: ({ row }) => (
          <FormControlLabel control={<Switch defaultChecked />} />
        ),
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
                    setOpenAccordan={setOpenAccordan}
                    handleDelete={async () => {
                      try {
                        setLoading(true);
                        await deleteInstructorData(row.original.id);
                        success("Instructor deleted successfully!");
                        getInstructorData();
                      } catch (e) {
                        error(e.message || "Failed to delete instructor!");
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
    [openAccordan]
  );

  //get Student data
  const getInstructorData = async () => {
    setLoading(true);
    getInstructors()
      .then((instructorData) => {
        setData(instructorData);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  //getclassdata
  //   const getClass = async () => {
  //     const data = await classData();
  //     setClassData(data)
  //   }

  useEffect(() => {
    getInstructorData();
  }, []);

  const Values = {
    name: "",
    email: "",
    country: "",
    mobile: "",
    license: "",
    date_of_birth: "",
    address: "",
    gender: "",
    class_id: "",
    course_id: "",
  };

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    resetForm,
    touched,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: Values,
    validationSchema: addTeacherSchema,
    onSubmit: (values, action) => {
      setLoading(true);
      addInstructors({
        ...values,
        mobile: values.mobile.toString(),
        course_id: courses[0].value,
        class_id: classes[0].value,
        type: "Onshore",
      })
        .then(() => {
          success("Instructor submitted successfully");
          action.resetForm();
          setLoading(false);
          setOpen(false);
          getInstructorData();
        })
        .catch((err) => {
          error(err.message);
          setLoading(false);
        });
    },
  });

  //getcourse

  const GetCourse = async () => {
    const data = await getCourses();

    const rescourse = await data.course;
    const resclass = await data.class;

    const courseOptions = rescourse.map((course) => ({
      label: course.course_name,
      value: course.id,
      class_id: course.class_id
    }));
    const classOptions = resclass.map((course) => ({
      label: course.class,
      value: course.id,
    }));

    setCourseData(courseOptions);
    setClassData(classOptions);
  };

  useEffect(() => {
    GetCourse();
  }, []);

  return (
    <div className="adminpanel">
      <Sidebar />
      <div className="adminpanelpage">
        <Navbar data={JSON.parse(localStorage.getItem("user", "{}"))} />
        <div className="learner-box">
          <div className="navigation">
            <NavLink to="/dashboard">Dashboard</NavLink> <ChevronRightIcon />{" "}
            <p>Instructor</p>
          </div>

          <div className="learner-list-box">
            <div className="modal-btn">
              <h5>Instructor Details</h5>
              <Button onClick={handleOpen}>
                <AddIcon /> Add Instructor
              </Button>
            </div>

            <Modal
              className="modal"
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="modal-box">
                <div className="create-detail">
                  <p>Create Instructor</p>
                  <Button className="closequestionicon" onClick={handleClose}>
                    <CloseIcon />
                  </Button>
                </div>

                <form onSubmit={handleSubmit} className="instructor-form">
                  <div className="formbox">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.name && touched.name ? (
                      <p className="errorval">{errors.name}</p>
                    ) : null}
                  </div>

                  <div className="formbox">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email && touched.email ? (
                      <p className="errorval">{errors.email}</p>
                    ) : null}
                  </div>

                  <div className="formbox">
                    <label htmlFor="mobile">Phone Number</label>
                    <input
                      type="number"
                      name="mobile"
                      value={values.mobile}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.mobile && touched.mobile ? (
                      <p className="errorval">{errors.mobile}</p>
                    ) : null}
                  </div>

                  <div className="formbox">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.address && touched.address ? (
                      <p className="errorval">{errors.address}</p>
                    ) : null}
                  </div>

                  <div className="formbox">
                    <label htmlFor="license">License</label>
                    <input
                      type="text"
                      name="license"
                      value={values.license}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.license && touched.license ? (
                      <p className="errorval">{errors.license}</p>
                    ) : null}
                  </div>

                  <div className="formbox">
                    <label htmlFor="name">Country</label>

                    <select
                      name="country"
                      value={values.country}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="">Select Country</option>
                      {CountriesData.map((curElem) => (
                        <option key={curElem.code} value={curElem.name}>
                          {curElem.name}
                        </option>
                      ))}
                    </select>

                    {errors.country && touched.country ? (
                      <p className="errorval">{errors.country}</p>
                    ) : null}
                  </div>

                  <div className="formbox">
                    <label htmlFor="class">Class</label>
                    <Select
                      // isMulti
                      name="class"
                      options={classData}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      value={classes}
                      onChange={onClassChange}
                      onBlur={handleBlur}
                    />
                    {errors.class_id && touched.class_id && !classes.length ? (
                      <p className="errorval">Please select class</p>
                    ) : null}
                  </div>

                  <div className="formbox">
                    <label htmlFor="course">Course</label>
                    <Select
                      // isMulti
                      name="course"
                      options={
                        !classes.length
                          ? []
                          : coursedata.filter(
                              (course) =>
                                course.class_id.toString() ===
                                classes[0].value.toString()
                            )
                      }
                      className="basic-multi-select"
                      classNamePrefix="select"
                      value={courses}
                      onChange={onCourseChange}
                      onBlur={handleBlur}
                    />
                    {errors.course_id &&
                    touched.course_id &&
                    !courses.length ? (
                      <p className="errorval">Please select course</p>
                    ) : null}
                  </div>

                  <div className="formbox">
                    <label htmlFor="gender">Gender</label>
                    <select
                      name="gender"
                      value={values.gender}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    {errors.gender && touched.gender ? (
                      <p className="errorval">{errors.gender}</p>
                    ) : null}
                  </div>

                  <div className="formbox">
                    <label htmlFor="date_of_birth">Date of Birth</label>
                    <input
                      type="date"
                      name="date_of_birth"
                      value={values.date_of_birth}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.date_of_birth && touched.date_of_birth ? (
                      <p className="errorval">{errors.date_of_birth}</p>
                    ) : null}
                  </div>

                  <div className="submitbtn">
                    <button type="submit">
                      <AddIcon /> Create
                    </button>
                  </div>
                </form>
              </Box>
            </Modal>

            <CustomReactTable columns={columns} data={data} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learner;
