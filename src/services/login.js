import { Axios } from "../utils/axios";
const axios = new Axios()
import { routes } from "../constants/url";

export const login = async (data) => {
    const {data: logInData} = await axios.post(routes.login, {
        email: data.email,
        password: data.password
    });

    if(logInData) {
        localStorage.setItem("user", JSON.stringify(logInData.data))
    }
}