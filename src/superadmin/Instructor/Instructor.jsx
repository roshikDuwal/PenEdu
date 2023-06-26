import React, { useMemo, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import "../admin.scss"
import "./instructor.scss"
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
import { Accordan } from '../../components/TableAccordan/Accordan'


const Learner = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openAccordan, setOpenAccordan] = useState(null);

    const data = useMemo(
        () => [
            { id: 1, name: 'John Doe', courseno: 28261, type: 'onshore', contact: '9860077825', email: 'john@pen.edu.au' },
            { id: 2, name: 'Jane Smith', courseno: 32261, type: 'offshore', contact: '9860077825', email: 'jane@pen.edu.au' },
            { id: 3, name: 'Bob Johnson', courseno: 45261, type: 'onshore', contact: '9860077825', email: 'bob@pen.edu.au' },
        ], []);


    const columns = React.useMemo(
        () => [
            { Header: 'Instructor Id', accessor: 'id' },
            { Header: 'Instructor Name', accessor: 'name' },
            { Header: 'Course', accessor: 'courseno' },
            { Header: 'Email', accessor: 'email' },
            { Header: 'Contact', accessor: 'contact' },

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
                        <NavLink to="/admin">Admin</NavLink>  <ChevronRightIcon />  <p>Instructor</p>
                    </div>

                    <div className="learner-list-box">
                        <div className="modal-btn">
                            <h5>Instructor Details</h5>
                            <Button onClick={handleOpen}><AddIcon /> Add Instructor</Button>
                        </div>

                        <Modal className='modal'
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box className="modal-box">
                                <div className='create-detail'>
                                    <p>Create Instructor</p>
                                    <Button className='closequestionicon' onClick={handleClose}><CloseIcon /></Button>
                                </div>

                                <form onSubmit={handleSubmit} className='instructor-form'>

                                    <div className="formbox">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" name="name" />
                                    </div>

                                    <div className="formbox">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name="email" />
                                    </div>

                                    <div className="formbox">
                                        <label htmlFor="mobile">Phone Number</label>
                                        <input type="number" name="mobile" />
                                    </div>


                                    <div className="formbox">
                                        <label htmlFor="address">Address</label>
                                        <input type="text" name="address" />
                                    </div>

                                    <div className="formbox">
                                        <label htmlFor="license">License</label>
                                        <input type="text" name="license" />
                                    </div>


                                    <div className="formbox">
                                        <label htmlFor="name">Country</label>
                                        <input type="text" name="name" />
                                    </div>

                                    <div className="formbox">
                                        <label htmlFor="type">Class</label>
                                        <select name="type" >
                                            <option disabled selected value="class">Select class</option>
                                            <option value="year11">Year 11</option>
                                            <option value="year12">Year12</option>
                                        </select>
                                    </div>

                                    <div className="formbox">
                                        <label htmlFor="type">Course</label>
                                        <select name="type" >
                                            <option disabled selected value="account">Select course</option>
                                            <option value="account">Account</option>
                                            <option value="year12">Nepali</option>
                                        </select>
                                    </div>

                                    <div className="formbox">
                                        <label htmlFor="type">Gender</label>
                                        <select name="type" >
                                            <option value="gender" disabled selected >Select gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>

                                    <div className="formbox">
                                        <label htmlFor="dateofbirth">Date of Birth</label>
                                        <input type="date" name="dateofbirth" />
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