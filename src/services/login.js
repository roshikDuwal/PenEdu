import axios from "axios";
import { redirect } from "react-router-dom";

export const login = async (data) => {
    // const logInData = await axios.post("www.wasd/log", {
    //     email: data.email,
    //     password: data.password
    // });

    localStorage.setItem("accessToken", "logInData.accessToken")
    redirect("/admin")
}