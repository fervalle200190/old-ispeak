import { API_URL } from "./settings";

export default async function getStudentsData({ students }) {
  const URL = `${API_URL}/Cursos/GetAllByAlumno/`;
  console.log(students);

  const responses = await students.map(async ({ id, nombre }) => {
    const response = await fetch(URL + id);
    const courses = await response.json();
    const completed = await courses.filter(
      ({ porcentajeCompletado }) => porcentajeCompletado >= 100
    );
    return {
      id: id,
      name: nombre,
      courses: courses,
      completed: completed.length,
    };
  });

  return Promise.all(responses);
}
