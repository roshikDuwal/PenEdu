import React from 'react'
import "./admin.scss"
import Sidebar from "../components/sidebar/Sidebar"
import Navbar from '../components/panelnavbar/Navbar'

const Adminpanel = () => {
  const data={
    name:"Admin"
  }
  return (
    <>
        <div className="adminpanel">
            <Sidebar/>
            <div className="adminpanelpage">
                <Navbar data={data}/>

                <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <h1>WELCOME TO ADMIN PAGE</h1>
                </div>
            </div>
        </div>
    </>
  )
}

export default Adminpanel