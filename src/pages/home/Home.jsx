import React from 'react'
import { NavLink } from 'react-router-dom'
import "./home.scss"
import Herosection from "../../components/herosection/Herosection"

const Home = () => {

  const data = {
    name: "Better Education",
    description: "PEN Clinic targets your weakness , directing your time and energy into specialised practice to achieve academic success",
    image: "/hero.jpg",
    button: "Contact Us"
  }
  return (
    <>
      <nav className='homenav'>
        <div className="logo">
          <img src="/logo.png" alt="" />
        </div>
        <div className="navbar">
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li>Course</li>
            <li>About Us</li>
          </ul>
        </div>
      </nav>

      <Herosection data={data} />
    
    </>
  )
}

export default Home