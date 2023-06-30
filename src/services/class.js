import axios from "axios";
import {routes} from "../constants/url"


export const classData = async()=>{
    const getclass = await axios.get(routes.getClasses)

    return getclass.data.class
}

export const postClassData= async(classdata)=>{
    const postclass = await axios.post(routes.addClasses,classdata)
    return postclass
}