import React from 'react'
import "./admin.scss"
import Sidebar from "../components/sidebar/Sidebar"
import Navbar from '../components/panelnavbar/Navbar'
import Overview from '../studentpanel/tabbar/overview/Overview'
import { getCurrentRole, roles } from '../utils/common'

const Adminpanel = () => {
  const data={
    name:"Admin"
  }
  return (
    <>
        <div className="adminpanel">
            <Sidebar/>
            <div className="adminpanelpage">
                <Navbar data={JSON.parse(localStorage.getItem("user", "{}"))}/>

                <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                  {getCurrentRole() === roles.student ? <Overview /> : <h1>WELCOME TO ADMIN PAGE</h1>}
                </div>
            </div>
        </div>
    </>
  )
}

export default Adminpanel