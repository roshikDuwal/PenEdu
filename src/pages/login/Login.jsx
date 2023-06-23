import React, { useState } from 'react'
import "./login.scss"
import { NavLink} from 'react-router-dom'
import { useFormik } from "formik"
import {loginUpSchema} from "../../schema/validate"

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


import TextField from '@mui/material/TextField';
import { login } from '../../services/login'


const Values = {
  email: "",
  password: ""
}

const Login = () => {


  //--SUBMIT FORMIK---
  const { values, errors, handleBlur, handleChange, touched, handleSubmit,setSubmitting,isSubmitting } = useFormik({
    initialValues: Values,
    validationSchema: loginUpSchema,
    onSubmit: (values, action) => {
        console.log(values);
        login(values)
    }
  })


  // ---------eye SHOW HIde-------
  const [passwordType, setPasswordType] = useState("password");
  const togglepassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    } else {
      setPasswordType("password");
      return;
    }
  }



  return (
    <>
      <div className="login-container">

        <div className="registerbox">

          <h2>LOGIN</h2>

          <form action="" onSubmit={handleSubmit}>

            <div>
              <TextField className="input" label="Email" variant="outlined"
                type="email" name="email" autoComplete='off'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur} />

              {errors.email && touched.email ? (<p className='errorval'>{errors.email}</p>) : null}
            </div>

            <div>
              <div className="input-container">
                <TextField className='input'  label="Password" variant="outlined"
                  type={passwordType} name="password" autoComplete='off'
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur} />

                {passwordType === "password" ? <RemoveRedEyeIcon onClick={togglepassword} /> : <VisibilityOffIcon onClick={togglepassword} />}
              </div>
              {errors.password && touched.password ? (<p className='errorval'>{errors.password}</p>) : null}
            </div>

            <div>
              <NavLink to="/resetpassword">Forgot Password?</NavLink>
            </div>

            <div>
              <input disabled={isSubmitting} className='submit' type="submit" value="Submit" />
            </div>

          </form>
        </div >
      </div >
    </>
  )
}

export default Login;