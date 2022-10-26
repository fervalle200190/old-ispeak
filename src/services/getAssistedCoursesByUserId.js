import { API_URL } from "./settings";
export default function getAssistedCourses({ id }) {
  const URL = `${API_URL}/Cursos/GetAllByAlumno/${parseInt(id)}`;

  return fetch(URL)
    .then((response) => response.json())
    .then((response) => {
      const data = response;
      const courses = data.filter((course) => course.alumno !== null);
      return courses;
    });
}
