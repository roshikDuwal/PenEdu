import React, { useState } from 'react'
import "./login.scss"
import { NavLink, useNavigate } from 'react-router-dom'
import { redirect } from "react-router-dom";
import { useFormik } from "formik"
import { loginUpSchema } from "../../schema/validate"

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';

import TextField from '@mui/material/TextField';
import { login } from '../../services/login'
import { error, success } from '../../utils/toast';


const Values = {
  email: "",
  password: ""
}

const Login = () => {
  const navigate = useNavigate();


  //--SUBMIT FORMIK---
  const { values, errors, handleBlur, handleChange, touched, handleSubmit, setSubmitting, isSubmitting } = useFormik({
    initialValues: Values,
    validationSchema: loginUpSchema,
    onSubmit: async (values, action) => {
      setSubmitting(true);
      login(values).then(() => {
        setSubmitting(false);
        success("Logged in successfully")
        navigate("/dashboard")
      })
        .catch(e => {
          console.log(e)
          setSubmitting(false);
          error(e?.response?.data?.message || "Login failed")
        })
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


      <div className="loginbox">

        <div className="box1">
          <h4>Welcome to <br /> <span>P<span>E</span>N <span>EDUCATION</span> </span></h4>
        </div>

        <div className="box2">
          <div className="title">
            <div><LoginIcon /></div>
            <h2>LOGIN</h2>
          </div>


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
                <TextField className='input' label="Password" variant="outlined"
                  type={passwordType} name="password" autoComplete='off'
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur} />

                {passwordType === "password" ? <RemoveRedEyeIcon onClick={togglepassword} /> : <VisibilityOffIcon onClick={togglepassword} />}
              </div>
              {errors.password && touched.password ? (<p className='errorval'>{errors.password}</p>) : null}
            </div>



            <div>
              <input disabled={isSubmitting} className='btn btn-primary' type="submit" value="Submit" />
            </div>
            <div className='forgotpassword'>
              <NavLink to="/resetpassword">Forgot Password?</NavLink>
            </div>

          </form>
        </div>


      </div >

    </>
  )
}

export default Login;