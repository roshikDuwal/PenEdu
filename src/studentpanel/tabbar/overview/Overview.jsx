import React from 'react'
import "./overview.scss"


const Overview = ({data, cls}) => {


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
                                <td>{JSON.parse(localStorage.getItem("user", "{}"))?.name}</td>
                                <td>{JSON.parse(localStorage.getItem("user", "{}"))?.email}</td>
                                <td>{JSON.parse(localStorage.getItem("user", "{}"))?.country}</td>
                                <td>{JSON.parse(localStorage.getItem("user", "{}"))?.mobile}</td>
                                <td>{cls || "-"}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="detail">
                    <div className='heading'>
                      Subject
                    </div>
                    <div className="coursedetail">
                        <ul className='courselist' >
                           {data.map((curElem)=>{
                            return <li >{curElem.course_name}</li>
                           })}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Overview