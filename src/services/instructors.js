import axios from "axios";
import {routes} from "../constants/url";


export const addInstructors = async (InstructorData)=>{
    const addInstructor = await axios.post(routes.addInstructor,InstructorData)

    return addInstructor;
}


export const getInstructors = async ()=>{
    const instructors = await axios.get(routes.getInstructors)

    return instructors.data.teacher;
}
