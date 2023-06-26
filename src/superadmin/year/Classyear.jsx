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
import { Accordan } from '../../components/TableAccordan/Accordan'




const Learner = () => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openAccordan, setOpenAccordan] = useState(null);


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
            
            <button onClick={() => setOpenAccordan(row.original.id)}>
                <MoreHorizIcon />
              </button>
              {openAccordan === row.original.id && <Accordan setOpenAccordan={setOpenAccordan}/>}
            </div>
            </div>
          </>
        )
      }
    ],
    [openAccordan]
  );s

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

            <Modal className='classyearmodal '
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="modal-box">
                <div className='create-detail'>
                  <p>Create Year Class</p>
                  <Button className='closequestionicon' onClick={handleClose}><CloseIcon /></Button>
                </div>

                <form onSubmit={handleSubmit}>

                  <div className="formbox">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" />
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