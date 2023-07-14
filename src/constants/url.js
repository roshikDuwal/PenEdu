import { getCurrentRole, roles } from "../utils/common";

const SERVER_URL="https://v2pen.gesic.edu.np"
export const SERVER_BASE_URL=SERVER_URL +"/api/";

export const IMAGE_PREFIX = SERVER_URL + "/uploads/assessment/"
export const ASSIGNMENT_IMAGE_PREFIX = SERVER_URL + "/uploads/unit_assignment/"
export const ASSIGNMENT_QUESTION_IMAGE_PREFIX = SERVER_URL + "/uploads/unit_assignment_question/"
export const ASSIGNMENT_SUBMIT_IMAGE_PREFIX = SERVER_URL + "/uploads/unit_assignment_question/submits/"
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
    questionStore: "unit/assignment/question/add",
    getCourses:"course/index",
    addUnit:"unit/create",
    getUnits:"unit/index",
    addAssignment:"unit/assignment/create",
    getAssignments: "unit/assignment/",
    getAssignmentsByTeacher: "teacher/class/course/unit/assignments/",
    getAssignmentsByStudent: "class/courses/units/assignments/",
    getAssignment:"unit/assignment/questions/",
    addVideo:"unit/assignment/question/update/",
    getClasses: "class/index",
    getClassesByStudent: "class/list",
    getClassesByTeacher: "teacher/class/list",
    getCoursesByClass: "class/courses/",
    getCoursesByClassByTeacher: "teacher/course/list/",
    getUnitsByCourse: "class/courses/units/",
    getUnitsByCourseByTeacher: "teacher/class/course/units/",
    addClasses:"class/create",
    deleteClasses:"class/delete/",
    answerStore: "class/courses/units/assignments/store",
    addSchedule: "unit/assignment/schedule/create",
    editQuestion: "unit/assignment/single-question/edit/",
    editAssignment: "unit/assignment/edit/",
    deleteQuestion: "unit/assignment/singlequestion/delete/",
    getSubmits: "class/courses/units/assignments/getSubmit/"
}