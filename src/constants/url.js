const SERVER_URL="http://192.168.101:8080/"
const SERVER_BASE_URL=SERVER_URL +"/api/";


export const routes={
    addStudent:SERVER_BASE_URL + "learner/create",
    getStudents:SERVER_BASE_URL + "learner/index"
}