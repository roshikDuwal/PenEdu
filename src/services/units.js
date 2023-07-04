import { Axios } from "../utils/axios";
const axios = new Axios()
import {routes} from "../constants/url";

export const addUnits = async (studentData)=>{

    const addUnit = await axios.post(routes.addUnit,studentData)

    return addUnit;
}


export const getUnits = async ()=>{

    const courses = await axios.get(routes.getUnits)

    return courses.data;
}