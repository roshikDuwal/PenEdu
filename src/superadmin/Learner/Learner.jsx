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


const Learner = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  const [checked, setChecked] = useState(true);

  const handleClick = (e) => {
    setChecked(!checked)
  };



  const data = useMemo(
    () => [
      { id: 1, name: 'John Doe', courseno: 28261, type: 'onshore', contact: '9860077825', email: 'john@pen.edu.au' },
      { id: 2, name: 'Jane Smith', courseno: 32261, type: 'offshore', contact: '9860077825', email: 'jane@pen.edu.au' },
      { id: 3, name: 'Bob Johnson', courseno: 45261, type: 'onshore', contact: '9860077825', email: 'bob@pen.edu.au' },
    ], []);


  const columns = React.useMemo(
    () => [
      { Header: 'Student Id', accessor: 'id' },
      { Header: 'Student Name', accessor: 'name' },
      { Header: 'Course', accessor: 'courseno' },
      { Header: 'Type', accessor: 'type' },
      { Header: 'Contact', accessor: 'contact' },
      { Header: 'Email', accessor: 'email' },
      {
        Header: 'Status', Cell: ({ row }) => (
          <FormControlLabel control={<Switch  checked={checked} onChange={handleClick}  />} />
        )
      },
      {
        Header: 'Action', Cell: ({ row }) => (
          <>
            <div className="actionbox">
              <div className="update">
                <button onClick={() => setBool(!bool)}>  <MoreHorizIcon /></button>
               
              </div>
              <Button className='enroll' variant='contained' color='success' disabled={!checked}>Enroll now</Button>
            </div>

          </>

        )
      }
    ],
    []
  );

  const Values = {
    name: "",
    email: "",
    type: "",
    Country: "",
    Mobile: 0,
    Studentno: ""
  }

  const { values, errors, handleBlur, handleChange, touched, handleSubmit, isSubmitting } = useFormik({
    initialValues: Values,
    onSubmit: (values, action) => {
      console.log(values);
    }
  })



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
                    <input type="text" name="name" />
                  </div>

                  <div className="formbox">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" />
                  </div>

                  <div className="formbox">
                    <label htmlFor="type">Type</label>
                    <select name="type" >
                      <option value="Onshore">Onshore</option>
                      <option value="Offshore">Offshore</option>
                    </select>
                  </div>

                  <div className="formbox">
                    <label htmlFor="name">Country</label>
                    <input type="text" name="name" />
                  </div>

                  <div className="formbox">
                    <label htmlFor="mobile">Mobile</label>
                    <input type="number" name="mobile" />
                  </div>

                  <div className="formbox">
                    <label htmlFor="studentnumber">Student Number</label>
                    <input type="number" name="studentnumber" />
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