import axios from "axios";
import {routes} from "../constants/url";


export const addCourses = async (studentData)=>{
    const addCourse = await axios.post(routes.addCourse,studentData)

    return addCourse;
}


export const getCourses = async ()=>{
    const courses = await axios.get(routes.getCourses)

    return courses.data;
}