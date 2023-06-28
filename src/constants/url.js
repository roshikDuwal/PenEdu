const SERVER_URL="https://v2pen.gesic.edu.np"
const SERVER_BASE_URL=SERVER_URL +"/api/";


export const routes={
    addStudent:SERVER_BASE_URL + "learner/create",
    getStudents:SERVER_BASE_URL + "learner/index",
    addCourse:SERVER_BASE_URL + "course/create",
    getCourses:SERVER_BASE_URL + "course/index",
}