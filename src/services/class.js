import { Axios } from "../utils/axios";
const axios = new Axios();
import { routes } from "../constants/url";
import { getCurrentRole, roles } from "../utils/common";

export const classData = async () => {
  const getclass = await axios.get(
    getCurrentRole() === roles.student
      ? routes.getClassesByStudent
      : getCurrentRole() === roles.instructor
      ? routes.getClassesByTeacher
      : routes.getClasses
  );

  return getclass.data.class || getclass.data.classes;
};

export const postClassData = async (classdata) => {
  const postclass = await axios.post(routes.addClasses, classdata);

  return postclass;
};

export const deleteClassData = async (id) => {
  const deleteClass = await axios.delete(routes.deleteClasses + id);

  return deleteClass;
};
