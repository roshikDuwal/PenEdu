import React from 'react'
import "./admin.scss"
import Sidebar from "../components/sidebar/Sidebar"
import Navbar from '../components/panelnavbar/Navbar'

const Adminpanel = () => {
  return (
    <>
        <div className="adminpanel">
            <Sidebar/>
            <div className="adminpanelpage">
                <Navbar/>

                <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <h1>WELCOME TO ADMIN PAGE</h1>
                </div>
            </div>
        </div>
    </>
  )
}

export default Adminpanel