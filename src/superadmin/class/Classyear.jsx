import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "../admin.scss";
import "./classyear.scss";
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
import {
  classData,
  deleteClassData,
  postClassData,
  updateClassData,
} from "../../services/class";
import { success, error } from "../../utils/toast";
import { AddClassSchema } from "../../schema/validate";
import Select from "react-select";
import { Accordan } from "../../components/tableaccordan/Accordan";

const Learner = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    resetForm();
    setOpen(false);
    setUpdateClass(null);
  };
  const [classdata, setClassData] = useState([]);
  const [openAccordan, setOpenAccordan] = useState(null);
  const [updateClass, setUpdateClass] = useState(null);
  const [loading, setLoading] = useState(false);

  const columns = useMemo(
    () => [
      // { Header: 'Class id', accessor: 'id' },
      { Header: "Class Year", accessor: "class" },
      // { Header: 'Student Count', accessor: 'studentcount' },
      { Header: "Updated At", accessor: "updated_at" },
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
                    id={row.original.id}
                    handleDelete={async () => {
                      try {
                        setLoading(true);
                        await deleteClassData(row.original.id);
                        success("Class deleted successfully!");
                        getClass();
                      } catch (e) {
                        error(e.message || "Failed to delete class!");
                      }
                    }}
                    handleEdit={async () => {
                      try {
                        setLoading(true);
                        setUpdateClass(row.original);
                        setOpenAccordan(false);
                        setLoading(false);
                      } catch (e) {
                        error(e.message || "Failed to update class!");
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

  const Values = {
    class: "",
  };

  const {
    values,
    errors,
    resetForm,
    setFieldValue,
    handleBlur,
    handleChange,
    touched,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: updateClass || Values,
    validationSchema: AddClassSchema,
    enableReinitialize: true,
    onSubmit: (values, action) => {
      if(updateClass) {
        updateClassData(updateClass.id, values)
        .then(() => {
          success("Class Updated Successfully");
          action.resetForm();

          getClass();

          setOpen(false);
        })
        .catch((err) => {
          error(err.message || "Failed to update class");
        });
      } else {
        postClassData(values)
        .then(() => {
          success("Class Added Successfully");
          action.resetForm();

          getClass();

          setOpen(false);
        })
        .catch((err) => {
          error(err.message || "Failed to add class");
        });
      }
    },
  });

  //getClass
  const getClass = async () => {
    setLoading(true);
    classData()
      .then((classdata) => {
        setClassData(classdata);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getClass();
  }, []);

  const classesOptions = [
    { label: "Year 7", value: "Year 7" },
    { label: "Year 8", value: "Year 8" },
    { label: "Year 9", value: "Year 9" },
    { label: "Year 10", value: "Year 10" },
    { label: "Year 11", value: "Year 11" },
    { label: "Year 12", value: "Year 12" },
  ];

  return (
    <div className="adminpanel">
      <Sidebar />
      <div className="adminpanelpage">
        <Navbar data={JSON.parse(localStorage.getItem("user", "{}"))} />
        <div className="class-box">
          <div className="navigation">
            <NavLink to="/dashboard">Dashboard</NavLink> <ChevronRightIcon />{" "}
            <p>Class Year</p>
          </div>

          <div className="learner-list-box">
            <div className="modal-btn">
              <h5>Class year</h5>
              <Button onClick={handleOpen}>
                <AddIcon /> Create
              </Button>
            </div>

            <Modal
              className="classyearmodal "
              open={open || updateClass}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="modal-box">
                <div className="create-detail">
                  <p>{updateClass ? "Update Year Class" : "Create Year Class"}</p>
                  <Button className="closequestionicon" onClick={handleClose}>
                    <CloseIcon />
                  </Button>
                </div>

                <form onSubmit={handleSubmit} className="instructor-form">
                  <div className="formbox">
                    <label htmlFor="class">Class</label>
                    <Select
                      name="class"
                      value={classesOptions.find(
                        (opt) => opt.value === values.class
                      )}
                      options={classesOptions.filter(
                        (opt) =>
                          !classdata.map((cls) => cls.class).includes(opt.value) || opt.value === updateClass?.class
                      )}
                      onChange={(e) => {
                        setFieldValue("class", e.value);
                      }}
                      onBlur={handleBlur}
                    />
                    {errors.class && touched.class ? (
                      <p className="errorval">{errors.class}</p>
                    ) : null}
                  </div>

                  <div className="submitbtn">
                    <button disabled={isSubmitting} type="submit">
                      <AddIcon /> {updateClass ? "Update" : "Create"}
                    </button>
                  </div>
                </form>
              </Box>
            </Modal>

            <CustomReactTable
              columns={columns}
              data={classdata}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learner;
