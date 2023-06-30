import axios from "axios";
import {routes} from "../constants/url";


export const addAssignments = async (data)=>{
    const addAssignment = await axios.post(routes.addAssignment,data)

    return addAssignment.data;
}


export const getAssignments = async (id)=>{
    const assignment = await axios.get(routes.getAssignments + id)

    return assignment.data;
}

export const getAssignment = async (id) => {
    const assessment = await axios.get(routes.getAssignment + id)

    return assessment.data
}
