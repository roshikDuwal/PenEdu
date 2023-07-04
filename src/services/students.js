import { Axios } from "../utils/axios";
const axios = new Axios()
import {routes} from "../constants/url";


export const addStudents = async (studentData)=>{

    const addStudent = await axios.post(routes.addStudent,studentData)

    return addStudent;
}


export const getStudents = async ()=>{

    const students = await axios.get(routes.getStudents)

    return students.data.learner;
}

// export const deleteStudentData = async(id)=>{
//     const deleteStudent = await axios.delete(routes.getStudents + id)

//     return deleteStudent
// }