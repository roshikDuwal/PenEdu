import { Axios } from "../utils/axios";
const axios = new Axios();
import { routes } from "../constants/url";
import { getCurrentRole, roles } from "../utils/common";

export const addUnits = async (studentData) => {
  const addUnit = await axios.post(routes.addUnit, studentData);

  return addUnit;
};

export const getUnits = async () => {
  const courses = await axios.get(routes.getUnits);

  return courses.data;
};

export const getUnitsByCourse = async (id) => {
  const units = await axios.get(
    (getCurrentRole() === roles.instructor
      ? routes.getUnitsByCourseByTeacher
      : routes.getUnitsByCourse) + id
  );

  return units.data;
};
