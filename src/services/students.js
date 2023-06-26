import axios from "axios";
import {routes} from "../constants/url";


export const addStudents = async (studentData)=>{
    const addStudent = await axios.post(routes.addStudent,studentData)

    return addStudent;
}


export const getStudents = async ()=>{
    const students = await axios.get(routes.getStudents)

    return students.data.learner;
}