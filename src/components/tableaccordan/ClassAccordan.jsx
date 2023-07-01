import react, { useState } from "react";
import "./accordan.scss"
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import { Button } from "@mui/material";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
// import { classData, deleteClassData } from "../../services/class";
// import { error, success } from "../../utils/toast";
import {  useNavigate } from "react-router-dom";




export const ClassAccordan = ({ setOpenAccordan, id}) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    let navigate=useNavigate()


    // const deletehandler=()=>{
    //     deleteClassData(id)
    //     .then(()=>{
    //         success("Deleted Successfully")
    //         classData()
    //         navigate(0)
    //     }).catch((err)=>{
    //         error(err.message || "Failed to delete")
    //     })
    //   }
    


    const classdata = [
        {
            value: "8",
            label: "8"
        },
        {
            value: "9",
            label: "9"
        },
        {
            value: "10",
            label: "10"
        },
    ]


    //Update Data
    const Values = {
        name: "",
        email: "",
    }

    const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
        initialValues: Values,
        onSubmit: (values, action) => {
            console.log(values);
        }
    })

    return (
        <>

            <div className="tableaccordanbox">
                <div className="btnbox">
                    <button className="accordanbtn" onClick={(e) => {
                        e.stopPropagation()
                        setOpenAccordan(null)
                    }}><CloseIcon /></button>
                </div>

                <li className="profile">
                    <Button className="button" ><DeleteIcon /> Delete</Button>
                </li>

                <li className="profile">
                    <Button onClick={handleOpen} className="button"> <CreateIcon /> Edit</Button>
                </li>
            </div>

            {/* update ---  */}

            <Modal className='modal'
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="modal-box">
                    <div className='create-detail'>
                        <p>Update</p>
                        <Button className='closequestionicon' onClick={handleClose}><CloseIcon /></Button>
                    </div>

                    <form onSubmit={handleSubmit} className='instructor-form'>


                        <div className="formbox">
                            <label htmlFor="name">Class</label>

                            <select name="class_id" value={values.class_id}
                                onChange={handleChange}
                                onBlur={handleBlur}>
                                <option value="">Select Class</option>
                                {classdata.map((curElem) => (
                                    <option key={curElem.value} value={curElem.value}>{curElem.label}</option>
                                ))}
                            </select>

                            {errors.class_id && touched.class_id ? (<p className='errorval'>{errors.class_id}</p>) : null}
                        </div>

                        <div className='submitbtn'>
                            <button type="submit">
                                <AddIcon /> Update
                            </button>
                        </div>

                    </form>

                </Box>
            </Modal>
        </>
    )
}

