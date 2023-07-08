export const roles = {
    student: "STUDENT",
    admin: "ADMIN",
    instructor: "INSTRUCTOR"
}

export const getCurrentRole = () => {
    const user = JSON.parse(localStorage.getItem("user", "{}"));
    if(user?.role)
        return user.role;
    return roles.student
}
