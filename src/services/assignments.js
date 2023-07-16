import { Axios } from "../utils/axios";
const axios = new Axios();
import { SERVER_BASE_URL, routes } from "../constants/url";
import { getCurrentRole, roles } from "../utils/common";

export const addAssignments = async (data) => {
  const addAssignment = await axios.post(routes.addAssignment, data);

  return addAssignment.data;
};

export const addVideo = async (id, data) => {
  const addAssignment = await axios.post(routes.addVideo + id, data);

  return addAssignment.data;
};

export const addSchedule = async (data) => {
  const schedule = await axios.post(routes.addSchedule, data);

  return schedule;
};

export const deleteQuestion = async (id) => {
  const que = await axios.delete(routes.deleteQuestion + id);

  return que;
};

export const getAssignments = async (id) => {
  const assignment = await axios.get(
    (getCurrentRole() === roles.student
      ? routes.getAssignmentsByStudent
      : getCurrentRole() === roles.instructor
      ? routes.getAssignmentsByTeacher
      : routes.getAssignments) + id
  );

  return assignment.data;
};

export const getAssignment = async (id) => {
  const assessment = await axios.get(routes.getAssignment + id);

  return assessment.data;
};

export const updateQuestion = async (id, data) => {
  const question = await axios.patch(routes.editQuestion + id, data);

  return question;
};

export const updateAssignment = async (id, data) => {
  const assignment = await axios.patch(routes.editAssignment + id, data);

  return assignment;
};

export const saveAnswer = async (answerData) => {
  const saveResult = await axios.post(routes.answerStore, answerData);

  return saveResult;
};

export const checkAnswer = async (answerData) => {
  const checkResult = await axios.post(routes.checkAnswer, answerData);

  return checkResult;
};

export const saveQuestion = async (questionData) => {
  const saveResult = await axios.post(routes.questionStore, questionData);

  return saveResult;
};

export const saveQuestionScore = async (score) => {
  const saveResult = await axios.post(routes.singleQueScore, score);

  return saveResult;
};

export const getSubmits = async (unit_id) => {
  const submits = await axios.get(routes.getSubmits + unit_id);

  return submits.data;
};

export const getSubmitsByTeacher = async (courseId, unitId) => {
  const submits = await axios.get(
    "teacher/class/course/" +
      courseId +
      "/unit/" +
      unitId +
      "/assignments/student"
  );

  return submits.data;
};
