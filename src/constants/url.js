const SERVER_URL="https://v2pen.gesic.edu.np"
export const SERVER_BASE_URL=SERVER_URL +"/api/";

export const IMAGE_PREFIX = SERVER_URL + "/uploads/assessment/"
export const ASSIGNMENT_IMAGE_PREFIX = SERVER_URL + "/uploads/unit_assignment/"
export const ASSIGNMENT_QUESTION_IMAGE_PREFIX = SERVER_URL + "/uploads/unit_assignment_question/"
export const CHECK_IMAGE_PREFIX = SERVER_URL + "/uploads/assignment_check/"
export const VIDEO_PREFIX = SERVER_URL + "/uploads/unit_assignment_question/video/"
export const SOLUTION_VIDEO_PREFIX = SERVER_URL + "/uploads/assessment/"

export const routes={
    login:"login",
    addStudent:"learner/create",
    getStudents:"learner/index",
    addInstructor:"users/instructor/create",
    getInstructors:"users/instructor/index",
    addCourse:"course/create",
    getCourses:"course/index",
    addUnit:"unit/create",
    getUnits:"unit/index",
    addAssignment:"unit/assignment/create",
    getAssignments:"unit/assignment/",
    getAssignment:"unit/assignment/questions/",
    addVideo:"unit/assignment/questions/update/",
    getClasses:"class/index",
    addClasses:"class/create",
    deleteClasses:"class/delete/"
}