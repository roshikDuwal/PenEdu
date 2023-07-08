import { Axios } from "../utils/axios";
const axios = new Axios()
import {routes} from "../constants/url";


export const addCourses = async (studentData)=>{


    const addCourse = await axios.post(routes.addCourse,studentData)

    return addCourse;
}


export const getCourses = async ()=>{


    const courses = await axios.get(routes.getCourses)

    return courses.data;
}

export const getCoursesByClass = async (id)=>{
    const courses = await axios.get(routes.getCoursesByClass + id)

    return courses.data;
}
