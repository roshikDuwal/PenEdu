import React, { useEffect, useMemo, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import "../admin.scss"
import "./learner.scss"
import Navbar from '../../components/panelnavbar/Navbar'
import CustomReactTable from '../../components/CustomReactTable/CustomReactTable'

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';



import { useFormik } from 'formik';
import { NavLink } from 'react-router-dom'

import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { error, success } from '../../utils/toast'
import { addStudents, getStudents } from '../../services/students'
import { addStudentSchema } from '../../schema/validate'
import { Accordan } from '../../components/tableaccordan/Accordan'

import { CountriesData } from "../../constants/countires"



const Learner = () => {

  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openAccordan, setOpenAccordan] = useState(null);

  const columns = useMemo(
    () => [
      { Header: 'Student Id', accessor: 'id' },
      { Header: 'Student Name', accessor: 'name' },
      { Header: 'Course', accessor: 'courseno' },
      { Header: 'Type', accessor: 'type' },
      { Header: 'Contact', accessor: 'mobile' },
      { Header: 'Email', accessor: 'email' },
      {
        Header: 'Status', Cell: ({ row }) => (
          <FormControlLabel control={<Switch defaultChecked />} />
        )
      },
      {
        Header: 'Action', Cell: ({ row }) => (
          <>
            <div className="actionbox">
              <div className="update">

              <button onClick={() => setOpenAccordan(row.original.id)}>
                  <MoreHorizIcon />
                </button>
                {openAccordan === row.original.id && <Accordan setOpenAccordan={setOpenAccordan} />}
              </div>

              <Button className='enroll' variant='contained' color='success'>Enroll now</Button>
            </div>

          </>

        )
      }
    ],
    [openAccordan]
  );

  const Values = {
    name: "",
    email: "",
    type: "",
    country: "",
    mobile: "",
    student_number: ""
  }

  const { values, errors, handleBlur, handleChange, touched, handleSubmit, isSubmitting, setSubmitting } = useFormik({
    initialValues: Values,
    validationSchema: addStudentSchema,
    onSubmit: (values, action) => {
      addStudents(values)
        .then(() => {
          success("Learner submitted successfully");
          setSubmitting(false);
          setOpen(false);
          getStudentData();
        })
        .catch((err) => {
          error(err.message);
          setSubmitting(false);
        });
    }
  })

  const getStudentData = async () => {
    const data = await getStudents();
    setData(data);
  }

  useEffect( ()=>{
    getStudentData();
  },[])

  return (
    <div className="adminpanel">
      <Sidebar />
      <div className="adminpanelpage">
        <Navbar />
        <div className="learner-box">

          <div className="navigation">
            <NavLink to="/admin">Admin</NavLink>  <ChevronRightIcon />  <p>Learner</p>
          </div>

          <div className="learner-list-box">
            <div className="modal-btn">
              <h5>Learner Details</h5>
              <Button onClick={handleOpen}><AddIcon /> Add Member</Button>
            </div>

            <Modal className='modal'
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="modal-box">
                <div className='create-detail'>
                  <p>Create Learner</p>
                  <Button className='closequestionicon' onClick={handleClose}><CloseIcon /></Button>
                </div>

                <form onSubmit={handleSubmit}>

                  <div className="formbox">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur} />

                    {errors.name && touched.name ? (<p className='errorval'>{errors.name}</p>) : null}
                  </div>

                  <div className="formbox">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur} />

                    {errors.email && touched.email ? (<p className='errorval'>{errors.email}</p>) : null}
                  </div>

                  <div className="formbox">
                    <label htmlFor="type">Type</label>
                    <select name="type"
                      value={values.type}
                      onChange={handleChange}
                      onBlur={handleBlur} >
                      <option disabled selected value="account">Select type</option>
                      <option value="Onshore">Onshore</option>
                      <option value="Offshore">Offshore</option>
                    </select>

                    {errors.type && touched.type ? (<p className='errorval'>{errors.type}</p>) : null}
                  </div>

                  <div className="formbox">
                    <label htmlFor="name">Country</label>

                    <select name="country" value={values.country}
                      onChange={handleChange}
                      onBlur={handleBlur}>

                      {CountriesData.map((curElem) => (
                        <option key={curElem.code} value={curElem.name}>{curElem.name}</option>
                      ))}
                    </select>

                    {errors.country && touched.country ? (<p className='errorval'>{errors.country}</p>) : null}
                  </div>

                  <div className="formbox">
                    <label htmlFor="mobile">Mobile</label>
                    <input type="number" name="mobile"
                      value={values.mobile}
                      onChange={handleChange}
                      onBlur={handleBlur} />
                    {errors.mobile && touched.mobile ? (<p className='errorval'>{errors.mobile}</p>) : null}
                  </div>

                  <div className="formbox">
                    <label htmlFor="student_number">Student Number</label>
                    <input type="number" name="student_number"
                      value={values.student_number}
                      onChange={handleChange}
                      onBlur={handleBlur} />
                    {errors.student_number && touched.student_number ? (<p className='errorval'>{errors.student_number}</p>) : null}
                  </div>

                  <div className='submitbtn'>
                    <button type="submit">
                      <AddIcon /> Create
                    </button>
                  </div>

                </form>

              </Box>
            </Modal>

            <CustomReactTable columns={columns} data={data} />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Learner