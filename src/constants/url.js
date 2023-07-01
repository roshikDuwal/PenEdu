const SERVER_URL="https://v2pen.gesic.edu.np"
const SERVER_BASE_URL=SERVER_URL +"/api/";

export const IMAGE_PREFIX = SERVER_URL + "/uploads/assessment/"
export const ASSIGNMENT_IMAGE_PREFIX = SERVER_URL + "/uploads/student_assignment/"
export const ASSIGNMENT_QUESTION_IMAGE_PREFIX = SERVER_URL + "/uploads/unit_assignment_question/"
export const CHECK_IMAGE_PREFIX = SERVER_URL + "/uploads/assignment_check/"
export const VIDEO_PREFIX = SERVER_URL + "/uploads/unit_assignment_question/video/"
export const SOLUTION_VIDEO_PREFIX = SERVER_URL + "/uploads/assessment/"

export const routes={
    addStudent:SERVER_BASE_URL + "learner/create",
    getStudents:SERVER_BASE_URL + "learner/index",
    addCourse:SERVER_BASE_URL + "course/create",
    getCourses:SERVER_BASE_URL + "course/index",
    addUnit:SERVER_BASE_URL + "unit/create",
    getUnits:SERVER_BASE_URL + "unit/index",
    addAssignment:SERVER_BASE_URL + "unit/assignment/create",
    getAssignments:SERVER_BASE_URL + "unit/assignment/",
    getAssignment:SERVER_BASE_URL + "unit/assignment/questions/",
    addVideo:SERVER_BASE_URL + "unit/assignment/questions/update/",
    getClasses:SERVER_BASE_URL + "class/index",
    addClasses:SERVER_BASE_URL + "class/create",                                                     
    deleteClasses:SERVER_BASE_URL + "class/delete/"
}