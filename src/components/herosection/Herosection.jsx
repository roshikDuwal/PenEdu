import React from 'react'
import { NavLink } from "react-router-dom"
import { Button } from '@mui/material'
import "./herosection.scss"

const Herosection = ({ data}) => {

    const {name,description,image,button}=data

    return (

        <>
            <div className="container">

                <div className="grid grid-two-column" >

                    <div className="hero-section-data">
                            <p style={{fontWeight:"900"}} className="intro-data">For</p>
                            <h1>{name}</h1>
                            <p>{description}</p>
                            <NavLink to="#"><Button className='hero-button'>{button}</Button></NavLink>
                    </div>

                    
                    <div className="hero-section-image">
                            <figure>
                                <img src={image} alt={name} className='heroimage' />
                            </figure>
                        </div>
                </div>
            </div>
        </>

    )
}


export default Herosection