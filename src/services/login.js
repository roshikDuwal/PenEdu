import { Axios } from "../utils/axios";
const axios = new Axios()
import { routes } from "../constants/url";
import { roles } from "../utils/common";

export const login = async (data) => {
    const {data: logInData} = await axios.post(routes.login, {
        email: data.email,
        password: data.password
    });

    if(logInData) {
        localStorage.setItem("user", JSON.stringify({...logInData.data, role: logInData.data?.adminUsers?.name === "admin" ? roles.admin : (logInData.data?.adminUsers?.name === "instructor" ? roles.instructor : roles.student)}))
    }
}