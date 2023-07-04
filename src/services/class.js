import { Axios } from "../utils/axios";
const axios = new Axios()
import {routes} from "../constants/url"


export const classData = async()=>{
    const getclass = await axios.get(routes.getClasses)

    return getclass.data.class
}

export const postClassData= async(classdata)=>{
    const postclass = await axios.post(routes.addClasses,classdata)

    return postclass
}

export const deleteClassData =async (id) =>{
    const deleteClass = await axios.delete(routes.deleteClasses + id )

    return deleteClass.data
}