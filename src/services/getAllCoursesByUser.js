import { API_URL } from "./settings";

export default function getAllCoursesByUser({ id }) {
  const USER_ID = JSON.parse(localStorage.getItem("loggedAppUser")).id;
  const URL = `${API_URL}/Cursos/GetAllByAlumno/${USER_ID}`;

  return fetch(URL)
    .then((response) => response.json())
    .then((response) => {
      const data = response;
      return data;
    });
}
