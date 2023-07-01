import React, { useEffect, useMemo, useState } from 'react'
import { getCourses } from '../../../services/courses'
import CustomStudentReactTable from '../../customstudentreacttable/CustomStudenteactTable'

const StudentCourse = () => {
    const [course,setCourse]=useState([])
    const [loading,setLoading]=useState(false)

    const GetCourse = async()=>{
        setLoading(true)
        const data = await getCourses()
        setCourse(data.course)
        setLoading(false)
    }

    useEffect(()=>{
        GetCourse()
    },[])

    const columns = useMemo(
        () => [
          { Header: "Course Id", accessor: "id" },
          { Header: "Course Name", accessor: "course_name" },
          { Header: "Course Code", accessor: "course_code" },
          { Header: "Credit hours", accessor: "credit_hours" },
        ],
      );

  return (
    <>
        <CustomStudentReactTable columns={columns} data={course} loading={loading} rowClickable={true}/>
    </>
  )
}

export default StudentCourse