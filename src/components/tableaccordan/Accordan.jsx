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



export const Accordan = ({ setOpenAccordan }) => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const classdata=[
    {
      value:"8",
      label:"8"
    },
    {
      value:"9",
      label:"9"
    },
    {
      value:"10",
      label:"10"
    },
  ]


  //Update Data
  const Values = {
    name: "",
    email: "",
  }

  const { values, handleBlur, handleChange, handleSubmit,errors } = useFormik({
    initialValues: Values,
    onSubmit: (values, action) => {
        console.log(values);
    }
  })

  return (
    <>
    
      <div className="tableaccordanbox">
        <div className="btnbox">
          <button className="accordanbtn" onClick={() => setOpenAccordan(null)}><CloseIcon /></button>
        </div>

        <li className="profile">
          <Button className="button"><DeleteIcon /> Delete</Button>
        </li>

        <li className="profile">
          <Button onClick={handleOpen} className="button"> <CreateIcon /> Edit</Button>
        </li>
      </div>

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
                      <option value="">Select type</option>
                      <option value="Onshore">Onshore</option>
                      <option value="Offshore">Offshore</option>
                    </select>

                    {errors.type && touched.type ? (<p className='errorval'>{errors.type}</p>) : null}
                  </div>


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



                  <div className="formbox">
                    <label htmlFor="mobile">Mobile</label>
                    <input type="text" name="mobile"
                      value={values.mobile}
                      onChange={handleChange}
                      onBlur={handleBlur} />
                    {errors.mobile && touched.mobile ? (<p className='errorval'>{errors.mobile}</p>) : null}
                  </div>

                  <div className="formbox">
                    <label htmlFor="student_number">Student Number</label>
                    <input type="text" name="student_number"
                      value={values.student_number}
                      onChange={handleChange}
                      onBlur={handleBlur} />
                    {errors.student_number && touched.student_number ? (<p className='errorval'>{errors.student_number}</p>) : null}
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

