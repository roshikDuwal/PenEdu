import React from 'react'
import "./overview.scss"


const Overview = ({data}) => {


    return (
        <>
            <div className="overview ">
                <div className="detail">
                    <div className='heading'>
                        Personal Detail
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Country</th>
                                <th>Phone Number</th>
                                <th>Class Year</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Roshin Lakhemaru</td>
                                <td>roshin@gmail.com</td>
                                <td>Nepal</td>
                                <td>9860782747</td>
                                <td>7</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="detail">
                    <div className='heading'>
                        Course
                    </div>
                    <div className="coursedetail">
                        <ul className='courselist' >
                           {data.map((curElem)=>{
                            return <li style={{padding:"1rem"}}>{curElem.course_name}</li>
                           })}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Overview