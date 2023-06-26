import React, { useEffect, useMemo, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import "../admin.scss"
import "./classyear.scss"
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




const Learner = () => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);





  const data = useMemo(
    () => [
        {id:"1",yearname:11,studentcount:25,updatedat:"2020"},
        {id:"2",yearname:12,studentcount:28,updatedat:"2020"},
    ], []);


  const columns =useMemo(
    () => [
      { Header: 'Year Name', accessor: 'yearname' },
      { Header: 'Student Count', accessor: 'studentcount' },
      { Header: 'Updated At', accessor: 'updatedat' },
      {
        Header: 'Action', Cell: ({ row }) => (
          <>
            <div className="actionbox">
              <div className="update">
                <button onClick={() => setBool(!bool)}>  <MoreHorizIcon /></button>
              </div>
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
            <NavLink to="/admin">Admin</NavLink>  <ChevronRightIcon />  <p>Class Year</p>
          </div>

          <div className="learner-list-box">
            <div className="modal-btn">
              <h5>Class year</h5>
              <Button onClick={handleOpen}><AddIcon /> Create</Button>
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