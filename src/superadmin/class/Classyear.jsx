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
import { Accordan } from '../../components/tableaccordan/Accordan'
import { classData, postClassData } from '../../services/class'
import {success,error} from "../../utils/toast"


const Learner = () => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [classdata, setClassData] = useState([]);
  const [openAccordan, setOpenAccordan] = useState(null);
  const [loading,setLoading]=useState(false)

  const columns =useMemo(
    () => [
      { Header: 'Class id', accessor: 'id' },
      { Header: 'Class Year', accessor: 'class' },
      { Header: 'Student Count', accessor: 'studentcount' },
      { Header: 'Updated At', accessor: 'updated_at' },
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
  );


  const Values = {
    class: "",
  }


  const { values, errors, handleBlur, handleChange, touched, handleSubmit, isSubmitting } = useFormik({
    initialValues: Values,
    onSubmit: (values, action) => {
      postClassData(values)
      .then(()=>{
        success("Class Added Successfully")
        action.resetForm
        getClass()
        setOpen(false)
      }).catch((err)=>{
        error("Error found")
        console.error(err.message);
      })
    }
  })

  

  //getClass
  const getClass=async()=>{
    setLoading(true)
    classData()
    .then(classdata=>{
      setClassData(classdata)
    })
    .finally(()=>{
      setLoading(false)
    })

    
}

useEffect(()=>{
  getClass()
},[])


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
                    <label htmlFor="class">Class</label>
                    <input type="text" name="class" 
                    onChange={handleChange} 
                    onBlur={handleBlur}
                    value={values.class}/>
                    
                  </div>

                  <div className='submitbtn'>
                    <button type="submit">
                      <AddIcon /> Create
                    </button>
                  </div>
                </form>
              </Box>
            </Modal>

            <CustomReactTable columns={columns} data={classdata} loading={loading} />

          </div>
        </div>
      </div>
    </div>
  )
}

export default Learner