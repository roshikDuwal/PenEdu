import Sidebar from '../../components/sidebar/Sidebar'
import "../admin.scss"
import "./list.scss"
import Navbar from '../../components/panelnavbar/Navbar'

import Button from '@mui/material/Button';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import AddIcon from '@mui/icons-material/Add';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { NavLink } from 'react-router-dom'
import CustomReactTable from '../../components/CustomReactTable/CustomReactTable';
import React, { useEffect, useMemo, useState } from 'react';
import { Accordan } from '../../components/tableaccordan/Accordan';
import Select from "react-select";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import CloseIcon from "@mui/icons-material/Close";

import { useFormik } from "formik";

import { addUnitSchema } from "../../schema/validate";
import { error, success } from "../../utils/toast";
import { getCourses } from '../../services/courses';

const List = () => {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const [data, setData] = useState([
        { id: 1, name: 'Algebra', courseno: 28261, type: 'onshore' },
        { id: 2, name: 'Science', courseno: 32261, type: 'offshore' },
    ]);
    const [courses, setCourses] = useState([]);
    const handleClose = () => {
      resetForm();
      setOpen(false);
    };

    const [openAccordan, setOpenAccordan] = useState(null);

    const getData = async () => {
        setLoading(true)
        const data = await getCourses();
        setCourses(
            data.course.map((data) => {
            return { label: data.course_name, value: data.id };
          })
        );
        setLoading(false)
      };

      useEffect(() => {
        getData();
      }, []);


    const columns = useMemo(
        () => [
            { Header: 'Unit Id', accessor: 'id' },
            { Header: 'Unit Name', accessor: 'name' },
            { Header: 'Course', accessor: 'courseno' },
            {
                Header: 'Action', Cell: ({ row }) => (
                    <>
                      <div className="actionbox">
                        <div className="update">

                        <button onClick={(e) => {
                            e.stopPropagation();
                            setOpenAccordan(row.original.id)
                        }}>
                            <MoreHorizIcon />
                          </button>
                          {openAccordan === row.original.id && <Accordan setOpenAccordan={setOpenAccordan} />}
                        </div>
                      </div>

                    </>

                )
            }
        ],
        [openAccordan]
    );

    const Values = {
        unit_name: "",
        course_id: "",
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
        validationSchema: addUnitSchema,
        initialValues: Values,
        onSubmit: async (values, action) => {
          try {
            // await addCourses({...values, credit_hours: values.credit_hours.toString()});
            success("Unit added successfully!")
            action.resetForm();
            getData();
            handleClose();
          } catch (e) {
            error(e.message || "Failed to add course!")
          }
        },
      });

    return (
        <div className="adminpanel">
            <Sidebar />
            <div className="adminpanelpage">
                <Navbar />
                <div className="learner-box">

                    <div className="navigation">
                        <NavLink to="/admin">Admin</NavLink>  <ChevronRightIcon />  <p>Units</p>
                    </div>

                    <div className="learner-list-box">
                        <div className="modal-btn">
                            <h5>Unit Details</h5>
                            <Button onClick={handleOpen}><AddIcon />Add Unit</Button>
                        </div>

                        <Modal
                            className="modal"
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            >
                            <Box className="modal-box ">
                                <div className="create-detail">
                                <p>Create Unit</p>
                                <Button className="closequestionicon" onClick={handleClose}>
                                    <CloseIcon />
                                </Button>
                                </div>

                                <form onSubmit={handleSubmit} className="instructor-form">
                                <div className="formbox">
                                    <label htmlFor="unit_name">Name</label>
                                    <input
                                    type="text"
                                    name="unit_name"
                                    value={values.unit_name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    />
                                    {errors.unit_name && touched.unit_name ? (
                                    <p className="errorval">{errors.unit_name}</p>
                                    ) : null}
                                </div>

                                <div className="formbox">
                                    <label htmlFor="class">Course</label>
                                    <Select
                                    name="class"
                                    value={
                                        courses.length && values.course_id
                                        ? courses.find((cls) => cls.id === values.course_id)
                                        : ""
                                    }
                                    options={courses}
                                    onChange={(e) => setFieldValue("course_id", e.value)}
                                    onBlur={handleBlur}
                                    />
                                    {errors.course_id && touched.course_id ? (
                                    <p className="errorval">{errors.course_id}</p>
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
                        <CustomReactTable columns={columns} data={data} rowClickable={true} />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default List